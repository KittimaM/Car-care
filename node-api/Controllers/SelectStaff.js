const Conn = require('../db')

const SelectStaff = (req,res,next)=>{
    Conn.execute(`SELECT * FROM staff`,function(err,results){
        res.json(results)
    })
}

exports.SelectStaff =  SelectStaff