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
    imageObj: null,
    props: {
      backgroundColor: '3',
      borderWidth: 1,
      borderColor: '4',
      color: '0',
      hoverColor: '4',
      borderRadius: '5px',
      fontSize: '18px',
      borderStyle: 'none',
      boxShadow: '1px 3px 6px #888',
      boxShadowX: 1,
      boxShadowY: 1,
      boxShadowSize: 2,
      boxShadowColor: 4,
      boxShadowInset: false,
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
      },
      'border': {
        color: '3',
        style: 'solid',
        width: '1px'
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
  },

  'square': {
    type: 'shape',
    subType: 'square',
    style: {
      'pc': {
        left: '380px',
        top: '10px',
        width: '200px',
        height: '150px'
      },
      'mobile': {
        left: '80px',
        top: '10px',
        width: '200px',
        height: '150px'
      },
      'opacity': 100,
      'borderRadius': '0px',
      'border': {
        color: '3',
        style: 'solid',
        width: '1px'
      },
      'background': {
        color: '1',
        image: '',
        repeat: 'no-repeat',
        position: 'left top',
        size: ''
      },
      'shadow': {
        x: 0,
        y: 0,
        blur: 0,
        spread: 0,
        color: 4
      }
    }
  },

  'circle': {
    type: 'shape',
    subType: 'circle',
    style: {
      'pc': {
        left: '380px',
        top: '10px',
        width: '200px',
        height: '200px'
      },
      'mobile': {
        left: '80px',
        top: '10px',
        width: '200px',
        height: '200px'
      },
      'borderRadius': '50%',
      'opacity': 100,
      'border': {
        color: '3',
        style: 'solid',
        width: '1px'
      },
      'background': {
        color: '1',
        image: '',
        repeat: 'no-repeat',
        position: 'left top',
        size: ''
      },
      'shadow': {
        x: 0,
        y: 0,
        blur: 0,
        spread: 0,
        color: 4
      }
    }
  },

  'line': {
    type: 'shape',
    subType: 'line',
    style: {
      'pc': {
        left: '330px',
        top: '10px',
        width: '300px',
        height: ''
      },
      'mobile': {
        left: '30px',
        top: '10px',
        width: '300px',
        height: ''
      },
      'border': {
        color: '3',
        style: 'solid',
        width: '2px'
      }
    }
  },

  'vline': {
    type: 'shape',
    subType: 'vline',
    style: {
      'pc': {
        left: '479px',
        top: '10px',
        width: '',
        height: '300px'
      },
      'mobile': {
        left: '179px',
        top: '10px',
        width: '',
        height: '300px'
      },
      'border': {
        color: '3',
        style: 'solid',
        width: '2px'
      }
    }
  },

  'video': {
    type: 'video',
    content: {
      source: null
    },
    style: {
      pc: {
        left: '330px',
        top: '10px',
        width: '300px',
        height: '150px'
      },
      'mobile': {
        left: '50px',
        top: '10px',
        width: '200px',
        height: '120px'
      }
    }
  },
  'timer': {
    type: 'timer',
    data: {
      date: null,
      time: null,
      labelColor: null,
      numberColor: null,
      timerColor: null
    },
    style: {
      'pc': {
        left: '330px',
        top: '10px',
        width: '300px',
        height: 'auto'
      },
      'mobile': {
        left: '50px',
        top: '10px',
        width: '220px',
        height: 'auto'
      }
    }
  },

  'map': {
    type: 'map',
    data: {
      position: null,
      name: null
    },
    style: {
      'pc': {
        left: '330px',
        top: '10px',
        width: '300px',
        height: '200px'
      },
      'mobile': {
        left: '30px',
        top: '10px',
        width: '300px',
        height: '180px'
      }
    }
  },

  'swiper': {
    type: 'swiper',
    data: {
      images: []
    },
    style: {
      'pc': {
        left: '330px',
        top: '10px',
        width: '300px',
        height: '160px'
      },
      'mobile': {
        left: '50px',
        top: '10px',
        width: '220px',
        height: '120px'
      }
    }
  }
}
