<?php

namespace App\Services;

class ParseHtml {

    protected static $page = array();

    protected static $color_set = array();

    protected static $elements = array('pc'=>array(),'mobile'=>array());
    
    public static function decode($array) {
        if (is_array($array['html_json'])) {
            $content = $array['html_json'];
        } else {
            $content = json_decode($array['html_json'],true);
        }
        if (!isset($content['colorSet'])){
            return false;
        }

        self::$color_set = $content['colorSet'];

        self::$page['settings'] = $content['settings'];
        self::$page['settings']['hasmap'] = 0;
        self::$page['settings']['hasswiper'] = 0;
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

        // dd(self::$page);

        return self::$page;
    }

    protected static function parseSection($section_id, $section){
        self::$page['style']['pc']['section-'.$section_id] = self::parseSectionStyles($section['style']['pc'], 'pc');
        self::$page['style']['mobile']['section-'.$section_id] = self::parseSectionStyles($section['style']['mobile'], 'mobile');

        if (isset($section['style']['pc']['mask'])) {
            self::$page['style']['pc']['section-'.$section_id.' .section-inner'] = [
                'opacity'          => $section['style']['pc']['mask']['opacity'] / 100,
                'background-color' => self::getColor($section['style']['pc']['mask']['color'])
            ];
        }
        
        if (isset($section['style']['pc']['mask'])) {
            self::$page['style']['mobile']['section-'.$section_id.' .section-inner'] = [
                'opacity' => $section['style']['mobile']['mask']['opacity'] / 100,
                'background-color' => self::getColor($section['style']['mobile']['mask']['color'])
            ];
        }

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
    }

    protected static function parseSectionStyles ($sectionStyles, $version) {
        $section_width = $version === 'pc' ? '960px' : '360px';
        $styles = [
            'height' => $sectionStyles['height']
        ];
        if (isset($sectionStyles['border'])) {
            $border = self::parseBorder($sectionStyles['border']);
            $styles['border-top'] = $border;
            $styles['border-bottom'] = $border;
        }
        if (isset($sectionStyles['background'])) {
            $styles['background'] = self::parseBackground($sectionStyles['background']);
            $styles['width'] = $sectionStyles['background']['stretch'] ? '100%' : $section_width;
            $styles['margin'] = $sectionStyles['background']['stretch'] ? '' : '0 auto';
            $styles['background-size'] = $sectionStyles['background']['size'];
            if ($sectionStyles['background']['fixed'] ) {
                $styles['background-attachment'] = 'fixed';
            }
        }
        return $styles;
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

        if (isset($element['link']) && in_array($element['link']['url'], self::$page['settings']['goals'])){
            self::$page['elements'][$element_id]['link']['goal'] = 1;
        }

        if (isset($element['fixed']) && $element['fixed']) {
            unset(self::$page['style']['pc']['element-'.$element_id]['display']);
            unset(self::$page['style']['pc']['element-'.$element_id]['top']);
            unset(self::$page['style']['pc']['element-'.$element_id]['left']);
            unset(self::$page['style']['mobile']['element-'.$element_id]['display']);
            unset(self::$page['style']['mobile']['element-'.$element_id]['top']);
            unset(self::$page['style']['mobile']['element-'.$element_id]['left']);

            self::$page['style']['pc']['element-'.$element_id]['position'] = 'fixed';
            self::$page['style']['pc']['element-'.$element_id]['top'] = $element['fixedPosition']['top'];
            self::$page['style']['pc']['element-'.$element_id]['bottom'] = $element['fixedPosition']['bottom'];
            self::$page['style']['pc']['element-'.$element_id]['margin-left'] = $element['fixedPosition']['left'];
            self::$page['style']['pc']['element-'.$element_id]['z-index'] += 50000;
            self::$page['style']['mobile']['element-'.$element_id]['z-index'] += 50000;
            if ($element['fixedScrollPx']) {
                self::$page['style']['pc']['element-'.$element_id]['display'] = 'none';
            }
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
            case 'shape':
                self::parseElementShape($element_id, $element);
                break;
            case 'map':
                self::parseElementMap($element_id, $element);
                break;
            case 'video':
                self::parseElementVideo($element_id, $element);
                break;
            case 'timer':
                self::parseElementTimer($element_id, $element);
                break;
            case 'swiper':
                self::parseElementSwiper($element_id, $element);
                break;
            default:
                break;
        }
        
    }

    protected static function parseElementText ($element_id, $element) {
        self::$page['style']['common']['element-'.$element_id] = self::parseStyles($element['fontStyle']);
    }

    protected static function parseElementImage ($element_id, $element) {
    }

    protected static function parseElementForm ($element_id, $element) {
        self::$page['style']['common']['element-'.$element_id." label"] = self::parseStyles(['color'=>$element['props']['labelColor']]);
        self::$page['elements'][$element_id]['props']['goal'] = in_array('form', self::$page['settings']['goals']) ? 1 : 0;
        
        // 按钮
        self::$page['style']['common']['element-'.$element_id."-button"] = self::parseButton($element['button']);
    }

    protected static function parseElementButton ($element_id, $element) {
        self::$page['style']['common']['element-'.$element_id] = self::parseButton($element);
    }

    protected static function parseButton($element) {
        $styles = self::parseStyles($element['props']);

        // 边框
        if (isset($element['style']['border']) && $element['style']['border']['width'] != '0px') {
            $styles['border'] = self::parseBorder($element['style']['border']);
        }

        // 投影
        if (isset($element['style']['shadow'])) {
            $shadow = $element['style']['shadow'];
            if ($shadow['x'] || $shadow['y'] || $shadow['blur'] || $shadow['spread']) {
                $styles['box-shadow'] = self::parseShadow($shadow);
            }
        }

        // 如果是图片padding0 否则padding6
        if (isset($element['image']) && $element['image']) {
            $styles['padding'] = '0px';
        }

        return $styles;
    }

    protected static function parseElementHTML ($element_id, $element) {
        
    }

    protected static function parseElementShape ($element_id, $element) {
        // 边框
        $border = self::parseBorder($element['style']['border']);

        if ($border) {
            if ($element['subType'] === 'line') {
                self::$page['style']['common']['element-'.$element_id]['border-bottom'] = $border;
            } elseif ($element['subType'] === 'vline') {
                self::$page['style']['common']['element-'.$element_id]['border-right'] = $border;
            } else {
                self::$page['style']['common']['element-'.$element_id]['border'] = $border;
            }
        }

        // 透明度
        if (isset($element['style']['opacity']) && $element['style']['opacity'] < 100) {
            self::$page['style']['common']['element-'.$element_id]['opacity'] = $element['style']['opacity'] / 100;
        }

        // 圆角
        if (isset($element['style']['borderRadius']) && $element['style']['borderRadius'] !== '0px') {
            self::$page['style']['common']['element-'.$element_id]['border-radius'] = $element['style']['borderRadius'];
        }

        // 背景
        if (isset($element['style']['background'])) {
            $background = $element['style']['background'];
            self::$page['style']['common']['element-'.$element_id]['background'] = self::parseBackground($background);
            // 背景图片拉升
            if (isset($background['image']) && isset($background['size']) && $background['image'] && $background['size']) {
                self::$page['style']['common']['element-'.$element_id]['background-size'] = 'cover';
            }
        }

        // 投影
        if (isset($element['style']['shadow'])) {
            $shadow = $element['style']['shadow'];
            if ($shadow['x'] || $shadow['y'] || $shadow['blur'] || $shadow['spread']) {
                self::$page['style']['common']['element-'.$element_id]['box-shadow'] = self::parseShadow($shadow);
            }
        }
    }

    protected static function parseElementMap ($element_id, $element) {
        self::$page['settings']['hasMap'] = 1;
    }

    protected static function parseElementVideo ($element_id, $element) {
        
    }

    protected static function parseElementSwiper ($element_id, $element) {
        self::$page['settings']['hasSwiper'] = 1;
    }

    protected static function parseElementIcon ($element_id, $element) {
        self::$page['setting']['hasIcon'] = 1;
        self::$page['style']['pc']['element-'.$element_id]['font-size'] = $element['style']['pc']['width'];
        self::$page['style']['mobile']['element-'.$element_id]['font-size'] = $element['style']['mobile']['width'];
        self::$page['style']['common']['element-'.$element_id]['color'] = self::getColor($element['data']['color']);
    }

    protected static function parseBackground ($background) {
        if (is_array($background)) {
            $background_str = self::getColor($background['color']);
            if (isset($background['image']) && $background['image'] != '') {
                $background_str .= ' url(' . $background['image'] . ') ' . $background['repeat'] . ' ' . $background['position'];
            }
            return $background_str;
        } else {
            return $background;
        }
    }

    protected static function parseBorder ($border) {
        if ($border && $border['width'] != 0) {
            return $border['width'] . ' ' . $border['style'] . ' ' . self::getColor($border['color']);
        } else {
            return 0;
        }
    }

    protected static function parseShadow ($shadow) {
        return $shadow['x'] . 'px ' . $shadow['y'] . 'px ' . $shadow['blur'] . 'px ' . $shadow['spread'] . 'px ' . self::getColor($shadow['color']);
    }

    protected static function parseStyles ($styles) {
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

    protected static function parseCamelCase ($str) {
        return strtolower(preg_replace('/((?<=[a-z])(?=[A-Z]))/', '-', $str));
    }

    // protected static function parseStyle($prop, $value){
    //     if (substr($prop, -5, 5) === "Color")
    // }

    protected static function getColor ($str) {
        if ($str === "") {
            return "transparent";
        } elseif (substr($str, 0, 1) === "#") {
            return $str;
        } else {
            return self::$color_set[$str];
        }
    }
}

