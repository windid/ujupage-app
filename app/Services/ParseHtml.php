<?php

namespace App\Services;

class ParseHtml {

    protected static $page = array();

    protected static $color_set = array();

    protected static $elements = array('pc'=>array(),'mobile'=>array());
    
    public static function decode($array) {
        $content = json_decode($array['html_json'],true);

        self::$color_set = $content['colorSet'];

        self::$page['settings'] = $content['settings'];
        self::$page['sections'] = $content['sections'];
        self::$page['elements'] = $content['elements'];
        self::$page['style'] = array('common'=>array(), 'pc'=>array(), 'mobile'=>array());

        self::$page['variation'] = array(
            'id'        => $array['id'], 
            'page_id'   => $array['page_id'], 
            'name'      => $array['name']
        );

        self::$page['style']['pc']['content']['height'] = 0;
        self::$page['style']['mobile']['content']['height'] = 0;

        foreach ($content['sections'] as $section_id => $section) {
            self::parseSection($section_id, $section);
        }

        foreach ($content['elements'] as $element_id => $element) {
            self::parseElement($element_id, $element);
        }

        // print_r($content['elements']);

        // print_r(self::$elements);

        // print_r(self::$page);

        return self::$page;
    }

    protected static function parseSection($section_id, $section){
        self::$page['style']['pc']['section-'.$section_id]     = self::parseStyles($section['style']['pc']);
        self::$page['style']['mobile']['section-'.$section_id] = self::parseStyles($section['style']['mobile']);

        foreach ($section['elements']['pc'] as $element_id){
            self::$elements['pc'][$element_id] = self::$page['style']['pc']['content']['height'];
        }

        foreach ($section['elements']['mobile'] as $element_id){
            self::$elements['mobile'][$element_id] = self::$page['style']['mobile']['content']['height'];
        }

        self::$page['style']['pc']['content']['height'] += $section['style']['pc']['height'];
        self::$page['style']['pc']['content']['height'] .= "px";
        self::$page['style']['mobile']['content']['height'] += $section['style']['mobile']['height'];
        self::$page['style']['mobile']['content']['height'] .= "px";

        // self::$elements['pc'] = array_merge(self::$elements['pc'], $section['elements']['pc']);
        // self::$elements['mobile'] = array_merge(self::$elements['mobile'], $section['elements']['mobile']);

        // foreach ($section['elements'] as $element_id => $element) {

        //     self::parseElement($element_id, $element);

        //     switch ($element['type']) {
        //         case 'text':
        //             self::parseElementText($element_id, $element);
        //             break;
        //         case 'image':
        //             self::parseElementImage($element_id, $element);
        //             break;
        //         case 'form':
        //             self::parseElementForm($element_id, $element);
        //             break;
        //         case 'button':
        //             self::parseElementButton($element_id, $element);
        //             break;
        //         case 'html':
        //             self::parseElementHTML($element_id, $element);
        //             break;
        //         default:
        //             # code...
        //             break;
        //     }
        // }
    }

    protected static function parseElement($element_id, $element){
        if (isset(self::$elements['pc'][$element_id])){
            $element['style']['pc']['top'] = ($element['style']['pc']['top'] + self::$elements['pc'][$element_id])."px";
            self::$page['style']['pc']['element-'.$element_id] = self::parseStyles($element['style']['pc']);
        } else {
            self::$page['style']['pc']['element-'.$element_id] = array("display"=>"none");
        }

        if (isset(self::$elements['mobile'][$element_id])){
            $element['style']['mobile']['top'] = ($element['style']['mobile']['top'] + self::$elements['mobile'][$element_id])."px";
            $element['style']['mobile']['display'] = "block";
            self::$page['style']['mobile']['element-'.$element_id] = self::parseStyles($element['style']['mobile']);
        } else {
            self::$page['style']['mobile']['element-'.$element_id] = array("display"=>"none");
        }


        switch ($element['type']) {
            case 'text':
                self::parseElementText($element_id, $element);
                break;
            case 'image':
                self::parseElementImage($element_id, $element);
                break;
            case 'form':
                self::parseElementForm($element_id, $element);
                break;
            case 'button':
                self::parseElementButton($element_id, $element);
                break;
            case 'html':
                self::parseElementHTML($element_id, $element);
                break;
            default:
                break;
        }
        
    }

    protected static function parseElementText($element_id, $element){
        self::$page['style']['common']['element-'.$element_id] = self::parseStyles($element['fontStyle']);
    }

    protected static function parseElementImage($element_id, $element){
    }

    protected static function parseElementForm($element_id, $element){
        self::$page['style']['common']['element-'.$element_id." label"] = self::parseStyles(['color'=>$element['props']['labelColor']]);
        $hover_color = self::getColor($element['button']['props']['hoverColor']);
        unset ($element['button']['props']['hoverColor']);
        self::$page['style']['common']['element-'.$element_id."-button"] = self::parseStyles($element['button']['props']);
        self::$page['style']['common']['element-'.$element_id."-button:hover"] = ['background-color'=>$hover_color];

    }

    protected static function parseElementButton($element_id, $element){
        $hover_color = self::getColor($element['props']['hoverColor']);
        unset ($element['props']['hoverColor']);
        self::$page['style']['common']['element-'.$element_id] = self::parseStyles($element['props']);
        self::$page['style']['common']['element-'.$element_id.':hover'] = ['background-color'=>$hover_color];
    }

    protected static function parseElementHTML($element_id, $element){
        
    }

    protected static function parseStyles($styles){
        $new_styles = array();
        foreach ($styles as $key => $style){
            $key = self::parseCamelCase($key);
            if (substr($key, -5, 5) === "color"){
                $style = self::getColor($style);
            }
            if ($style) $new_styles[$key] = $style;
        }
        return $new_styles;
    }

    protected static function parseCamelCase($str){
        return strtolower(preg_replace('/((?<=[a-z])(?=[A-Z]))/', '-', $str));
    }

    // protected static function parseStyle($prop, $value){
    //     if (substr($prop, -5, 5) === "Color")
    // }

    protected static function getColor($str){
        if ($str === ""){
            return "transparent";
        } elseif (substr($str, 0, 1) === "#") {
            return $str;
        } else {
            return self::$color_set[$str];
        }
    }
}

