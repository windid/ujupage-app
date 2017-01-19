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
    text: '按钮',
    image: '',
    props: {
      backgroundColor: '3',
      color: '0',
      borderRadius: '4px',
      fontSize: '18px',
      fontWeight: 'normal'
    },
    style: {
      'pc': {
        left: '400px',
        top: '10px',
        width: '160px',
        height: 'auto'
      },
      'mobile': {
        left: '100px',
        top: '10px',
        width: '160px',
        height: 'auto'
      },
      'border': {
        color: '4',
        style: 'solid',
        width: '0px'
      },
      'shadow': {
        x: 0,
        y: 0,
        blur: 8,
        spread: 0,
        color: 3
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
    'button': {
      type: 'button',
      text: '提交',
      image: '',
      props: {
        backgroundColor: '3',
        color: '0',
        borderRadius: '4px',
        fontSize: '18px',
        fontWeight: 'normal'
      },
      style: {
        'pc': {
          left: '400px',
          top: '10px',
          width: '160px',
          height: 'auto'
        },
        'mobile': {
          left: '100px',
          top: '10px',
          width: '160px',
          height: 'auto'
        },
        'border': {
          color: '4',
          style: 'solid',
          width: '0px'
        },
        'shadow': {
          x: 0,
          y: 0,
          blur: 8,
          spread: 0,
          color: 3
        }
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
        size: 'auto'
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
        size: 'auto'
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
        left: '320px',
        top: '10px',
        width: '320px',
        height: '200px'
      },
      'mobile': {
        left: '20px',
        top: '10px',
        width: '320px',
        height: '200px'
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
        left: '320px',
        top: '10px',
        width: '320px',
        height: 'auto'
      },
      'mobile': {
        left: '20px',
        top: '10px',
        width: '320px',
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
        left: '320px',
        top: '10px',
        width: '320px',
        height: '240px'
      },
      'mobile': {
        left: '20px',
        top: '10px',
        width: '320px',
        height: '240px'
      }
    }
  },

  'swiper': {
    type: 'swiper',
    data: {
      images: [],
      button: true,
      auto: true,
      effect: 1
    },
    style: {
      'pc': {
        left: '320px',
        top: '10px',
        width: '320px',
        height: '240px'
      },
      'mobile': {
        left: '20px',
        top: '10px',
        width: '320px',
        height: '240px'
      }
    }
  },

  'icon': {
    type: 'icon',
    data: {
      color: '4',
      icon: 'comment'
    },
    style: {
      'pc': {
        left: '464px',
        top: '10px',
        width: '32px',
        height: '32px'
      },
      'mobile': {
        left: '164px',
        top: '10px',
        width: '32px',
        height: '32px'
      }
    }
  }
}
