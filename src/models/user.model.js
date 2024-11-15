// src/model/foodModel.js
const connection = require('../config/database');

const createUser = (userData) => {
    return new Promise((resolve, reject) => {
        const { email, password } = userData;
        connection.query(
            'INSERT INTO User (email, password) VALUES (?, ?)',
            [email, password],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve({ results }); // Trả về dữ liệu người dùng mới
            }
        );
    });
};

// Prevent SQL Injection
const findUserByEmail = (email, password) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM User WHERE email = ? AND password = ?', [email, password], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]); // Nếu không có lỗi, trả về kết quả tìm thấy
        });
    });
};

// SQL Injection
// const findUserByEmail = (email, password) => {
//     return new Promise((resolve, reject) => {
//         // Truy vấn trực tiếp ghép chuỗi, không sử dụng `?` hoặc bất kỳ phương thức bảo mật nào
//         const query = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;

//         connection.query(query, (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(results);
//         });
//     });
// };

module.exports = {
    createUser,
    findUserByEmail
}
