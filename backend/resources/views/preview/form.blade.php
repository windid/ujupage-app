<form class="element" id="element-{{$element_id}}" method="post" action="http://www.juyepage.com/post" msg="{{$element['props']['thankyou']}}" redirect="{{$element['props']['redirect']}}" data-goal="{{$element['props']['goal']}}">
  <input type="hidden" name="page_id" value="{{$content['variation']['page_id']}}">
  <input type="hidden" name="variation_id" value="{{$content['variation']['id']}}">
  <input type="hidden" name="variation_name" value="{{$content['variation']['name']}}">

@foreach($element['fields'] as $field_id=>$field)
  <div class="form-group">
  @if ($field['type'] === 'text')

    @if (!isset($element['props']['labelInside']) || !$element['props']['labelInside'])
      <div><label>{{$field['label']}}</label></div>
    @else
      <label for="form-{{$element_id}}-{{$field_id}}" class="label-inside">{{$field['label']}}</label>    
    @endif
      <input name="fields[{{$field['label']}}]" id="form-{{$element_id}}-{{$field_id}}" type="text" class="form-control form-field-input" 
        @if( in_array('required', $field['validator']) ) required @endif
        @if( in_array('email', $field['validator']) ) email="true" @endif
        @if( in_array('number', $field['validator']) || in_array('mobile', $field['validator']) ) number="true" @endif
        @if( in_array('mobile', $field['validator']) ) minlength="11" @endif
      >

  @elseif ($field['type'] === 'textarea')

    @if (!isset($element['props']['labelInside']) || !$element['props']['labelInside'])
      <div><label>{{$field['label']}}</label></div>
    @else
      <label for="form-{{$element_id}}-{{$field_id}}" class="label-inside">{{$field['label']}}</label>   
    @endif
      <textarea name="fields[{{$field['label']}}]" id="form-{{$element_id}}-{{$field_id}}" class="form-control form-field-input" rows="3" @if(in_array('required', $field['validator']) ) required @endif></textarea>

  @elseif ($field['type'] === 'radio')

    @if (!isset($field['hideLabel']) || !$field['hideLabel'])
      <div><label>{{$field['label']}}</label></div>
    @endif
    @foreach($field['options'] as $option)
      <div @if(isset($field['optionsInLine']) && $field['optionsInLine']) class="options-inline" @endif>
        <label><input name="fields[{{$field['label']}}]" type="radio" value="{{$option}}" @if(in_array('required', $field['validator']) ) required @endif > {{$option}}</label>
      </div>
    @endforeach
      <label style="display:none;" for="fields[{{$field['label']}}]" class="error"></label>

  @elseif ($field['type'] === 'checkbox')

    @if (!isset($field['hideLabel']) || !$field['hideLabel'])
      <div><label>{{$field['label']}}</label></div>
    @endif
    @foreach($field['options'] as $option)
      <div @if(isset($field['optionsInLine']) && $field['optionsInLine']) class="options-inline" @endif>
        <label><input name="fields[{{$field['label']}}][]" type="checkbox" value="{{$option}}" @if(in_array('required', $field['validator']) ) required @endif > {{$option}}</label>
      </div>
    @endforeach
      <div>
        <label style="display:none;" for="fields[{{$field['label']}}][]" class="error"></label>
      </div>

  @elseif ($field['type'] === 'dropdown')
    <div>
      <select name="fields[{{$field['label']}}]" class="form-control form-field-input" @if(in_array('required', $field['validator']) ) required @endif>
        <option value="" disabled selected hidden>{{$field['label']}}</option>
        @foreach($field['options'] as $option)
        <option value="{{$option}}">{{$option}}</option>
        @endforeach
      </select>
    </div>

  @elseif ($field['type'] === 'hidden')
    <input type="hidden" name="fields[{{$field['label']}}]" value="{{$field['val']}}">

  @elseif ($field['type'] === 'china-state')

  @endif
  </div>

@endforeach

  <button type="submit" class="btn element-button form-group" id="element-{{$element_id}}-button">
    @if (isset($element['button']['image']) && $element['button']['image'])
      <img class="element-button-image" src="{{$element['button']['image']}}" alt="{{$element['button']['text']}}">
    @else
      <span>{{$element['button']['text']}}</span>
    @endif
  </button>

</form>

