export default {
  'text': {
    type: 'text',
    content: '<p>双击开始编辑这段文字</p>',
    style: {
      'pc': {
        left: '380px',
        top: '10px',
        width: '200px'
      },
      'mobile': {
        left: '80px',
        top: '10px',
        width: '200px'
      }
    },
    fontStyle: {
      color: '4',
      fontSize: '16px',
      lineHeight: '1.4',
      textAlign: 'left'
    }
  },

  'image': {
    type: 'image',
    src: '',
    style: {
      'pc': {
        top: '10px',
        width: ''
      },
      'mobile': {
        top: '10px',
        width: ''
      }
    }
  },

  'button': {
    type: 'button',
    text: '点击下载',
    props: {
      backgroundColor: '3',
      borderColor: '4',
      color: '0',
      hoverColor: '4',
      borderRadius: '5px',
      fontSize: '18px',
      borderStyle: 'none',
      boxShadow: '1px 3px 6px #888',
      fontWeight: 'normal'
    },
    style: {
      'pc': {
        left: '400px',
        top: '10px',
        width: '160px',
        height: '37px'
      },
      'mobile': {
        left: '100px',
        top: '10px',
        width: '160px',
        height: '37px'
      }
    }
  },

  'form': {
    type: 'form',
    style: {
      'pc': {
        left: '330px',
        top: '10px',
        width: '300px'
      },
      'mobile': {
        left: '30px',
        top: '10px',
        width: '300px'
      }
    },
    props: {
      labelInside: true,
      innerShadow: false,
      boxShadow: '',
      fieldColor: '#fff',
      inputColor: '4',
      borderColor: '#ccc',
      labelColor: '3',
      redirect: '',
      thankyou: '表单提交成功，感谢！'
    },
    fields: [
      {
        label: '姓名',
        type: 'text',
        validator: ['required']
      },
      {
        label: '手机号码',
        type: 'text',
        validator: ['required', 'mobile']
      }
    ],
    button: {
      text: '提交',
      props: {
        backgroundColor: '3',
        borderColor: '4',
        color: '0',
        hoverColor: '4',
        borderRadius: '5px',
        fontSize: '18px',
        borderStyle: 'none',
        boxShadow: '1px 3px 6px #888',
        fontWeight: 'normal'
      }
    }
  },

  'html': {
    type: 'html',
    content: '',
    style: {
      'pc': {
        left: '330px',
        top: '10px',
        width: '300px',
        height: '150px'
      },
      'mobile': {
        left: '50px',
        top: '10px',
        width: '300px',
        height: '150px'
      }
    }
  }
}
