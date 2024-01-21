// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "user_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "defaultValue": {
      "$env": "uid"
    }
  },
  "category_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "title": "分类",
    "label": "分类"
  },
  "title": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "题目",
    "title": "题目"
  },
  "difficulty": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "难度",
    "label": "难度"
  },
  "content": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "试题内容",
    "title": "试题内容"
  },
  "answer": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "试题答案",
    "title": "试题答案"
  },
  "answer_analysis": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "答案解析",
    "title": "答案解析"
  },
  "is_choice": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "value": 0,
            "text": "否"
          },
          {
            "value": 1,
            "text": "是"
          }
        ]
      }
    ],
    "title": "是否为选择题",
    "defaultValue": 0,
    "label": "是否为选择题"
  },
  "answer_options": {
    "rules": [
      {
        "format": "array"
      }
    ],
    "title": "选项",
    "label": "选项"
  },
  "question_status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "value": 0,
            "text": "草稿箱"
          },
          {
            "value": 1,
            "text": "已发布"
          }
        ]
      }
    ],
    "title": "试题状态",
    "defaultValue": 0,
    "label": "试题状态"
  },
  "comment_status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "value": 0,
            "text": "关闭"
          },
          {
            "value": 1,
            "text": "开放"
          }
        ]
      }
    ],
    "title": "开放评论",
    "label": "开放评论"
  },
  "last_comment_user_id": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "publish_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "发表时间",
    "defaultValue": {
      "$env": "now"
    },
    "label": "发表时间"
  },
  "last_modify_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "最后修改时间",
    "defaultValue": {
      "$env": "now"
    },
    "label": "最后修改时间"
  },
  "mode": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "value": 0,
            "text": "普通模式"
          },
          {
            "value": 1,
            "text": "背题模式"
          }
        ]
      }
    ],
    "title": "查看模式",
    "defaultValue": 0,
    "label": "查看模式"
  }
}

const enumConverter = {
  "is_choice_valuetotext": {
    "0": "否",
    "1": "是"
  },
  "question_status_valuetotext": {
    "0": "草稿箱",
    "1": "已发布"
  },
  "comment_status_valuetotext": {
    "0": "关闭",
    "1": "开放"
  },
  "mode_valuetotext": {
    "0": "普通模式",
    "1": "背题模式"
  }
}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
