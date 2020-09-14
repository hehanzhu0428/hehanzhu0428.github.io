// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
let db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('bookingdata').where({
      userInfo: event.userInfo
    }).skip(event.skip).limit(event.limit).get();
    //skip(偏移数据量)指定查询返回结果时从指定序列后的结果开始返回
    //limit(查询数据量)指定查询结果集数量上限

  } catch (error) {
    
  }
}