<form class="element" id="element-{{$element_id}}">
  @foreach($element['fields'] as $field)
  <div class="form-field">
	@if ($field['type'] === 'text')
    @if ($element['props']['labelInside'])
      <div><label>{{$field['label']}}</label></div>
    @endif
    <input type="text" class="form-control form-field-input">
	@elseif ($field['type'] === 'textarea')
    @if ($element['props']['labelInside'])
      <div><label>{{$field['label']}}</label></div>
    @endif
    <textarea class="form-control form-field-input"></textarea>
	@elseif ($field['type'] === 'radio')

	@elseif ($field['type'] === 'checkbox')

	@elseif ($field['type'] === 'dropdown')

	@elseif ($field['type'] === 'china-state')

	@endif
  </div>

  @endforeach
</form>