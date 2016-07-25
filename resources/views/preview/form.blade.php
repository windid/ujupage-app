<form class="element" id="element-{{$element_id}}" method="post" action="">
@foreach($element['fields'] as $field_id=>$field)
  <div class="form-group">
	@if ($field['type'] === 'text')

    @if (!isset($element['props']['labelInside']) || !$element['props']['labelInside'])
      <div><label>{{$field['label']}}</label></div>
    @else
      <label for="form-{{$element_id}}-{{$field_id}}" class="label-inside">{{$field['label']}}</label>    
    @endif
      <input id="form-{{$element_id}}-{{$field_id}}" type="text" class="form-control form-field-input">

	@elseif ($field['type'] === 'textarea')

    @if (!isset($element['props']['labelInside']) || !$element['props']['labelInside'])
      <div><label>{{$field['label']}}</label></div>
    @else
      <label for="form-{{$element_id}}-{{$field_id}}" class="label-inside">{{$field['label']}}</label>   
    @endif
      <textarea id="form-{{$element_id}}-{{$field_id}}" class="form-control form-field-input" rows="3"></textarea>

	@elseif ($field['type'] === 'radio')

    @if (!isset($field['hideLabel']) || !$field['hideLabel'])
      <div><label>{{$field['label']}}</label></div>
    @endif
    @foreach($field['options'] as $option)
      <div @if(isset($field['optionsInLine']) && $field['optionsInLine']) class="options-inline" @endif>
        <label><input type="radio" value="{{$option}}"> {{$option}}</label>
      </div>
    @endforeach

	@elseif ($field['type'] === 'checkbox')

    @if (!isset($field['hideLabel']) || !$field['hideLabel'])
      <div><label>{{$field['label']}}</label></div>
    @endif
    @foreach($field['options'] as $option)
      <div @if(isset($field['optionsInLine']) && $field['optionsInLine']) class="options-inline" @endif>
        <label><input type="checkbox" value="{{$option}}"> {{$option}}</label>
      </div>
    @endforeach

	@elseif ($field['type'] === 'dropdown')
    <div>
      <select class="form-control form-field-input">
        <option value="" disabled selected hidden>{{$field['label']}}</option>
        @foreach($field['options'] as $option)
        <option value="{{$option}}">{{$option}}</option>
        @endforeach
      </select>
    </div>

	@elseif ($field['type'] === 'china-state')

	@endif
  </div>

@endforeach

  <button type="submit" class="element-button form-group" id="element-{{$element_id}}-button">
    <span>{{$element['button']['text']}}</span>
  </button>
</form>