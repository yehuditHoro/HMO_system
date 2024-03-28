const db = require('./db');
// get all members
async function getAllMembers() {
    let result = await db.query('select * from members');
    return result || [];
}
async function getSingleMember(id) {
    let result = await db.query(`select * from members where id=${id}`);
    console.log("result in single dsimple: " + result);
    if (!result) {
        result = "user does not exist"
    }
    return result;
}

async function getSickDetails(id) {
    let result = await db.query(`SELECT
    m.name,
    v.vac_date,
    v.manufacturer_id,
    c.sick_date,
    c.recovery_date
  FROM members m
  LEFT JOIN vaccines v ON v.member_id = m.member_id
  LEFT JOIN corona_info c ON c.member_id = m.member_id
  WHERE m.member_id = ${id}
  AND (c.sick_date IS NOT NULL OR v.vac_date IS NOT NULL)
  ORDER BY m.member_id, v.vac_date ASC, c.sick_date ASC;
  `);
    console.log("result in single dsimple: " + result);
    if (!result) {
        result = "user does not exist"
    }
    return result;
}
async function setNewUser(user) {
    console.log("insert, user = " + user);
    let q=`insert into covid_database.members (personal_id,f_name,l_name,phone,address,user_email,user_password,user_type) values (${JSON.stringify(user.personal_id)},${JSON.stringify(user.first_name)},${JSON.stringify(user.last_name)},${JSON.stringify(user.phone)},${JSON.stringify(user.address)},${JSON.stringify(user.email)},${JSON.stringify(user.password)},'simpleUsers')`
    console.log(q);
    const result = await db.query(q);
    return result;
}

async function deleteUser(id) {
    const result = await db.query(`delete from covid_database.members where personal_id=${id}`);
    return result;
}

async function updateUser(userId, user) {
    console.log(user);
    const result = await db.query(`UPDATE covid_database.members
                                   SET user_password=${JSON.stringify(user.password)},
                                   address=${JSON.stringify(user.address)},
                                   phone=${JSON.stringify(user.phone)},
                                   l_name=${JSON.stringify(user.last_name)},
                                   user_email=${JSON.stringify(user.email)}
                                   WHERE personal_id = ${userId};`);
    return result;
}

module.exports = {
    getAllMembers, getSingleMember, getSickDetails, setNewUser, deleteUser,updateUser
}

