// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
let db = cloud.database()
//获取查询指令
let _ = db.command;
exports.main = async (event, context) => {
  
  return await db.collection('bookingdata').where({
    userInfo: event.userInfo,
    date: _.gte(event.start).and(_.lte(event.end))
  }).get()
}