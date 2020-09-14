// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

let db = cloud.database()
let _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let params = {
    userInfo: event.userInfo
  }
  //年月查询
  if (event.end) {
    params.date = _.gte(event.start).and(_.lte(event.end))

  } else {
    params.date = event.start //日查询
  }
  try {
    return await db.collection('bookingdata').where(params).get()
  } catch (error) {
    
  }

}