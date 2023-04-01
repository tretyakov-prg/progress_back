var db = require('../models/mysql.model');

exports.getUsers = async () => {
    try {
        //var sql='SELECT * FROM quest_bot';
        var sql='SELECT task_items.guid, task_items.task, task_items.description , task_status.guid as sguid FROM task_items INNER JOIN task_status ON task_items.status = task_status.id'

        return await db.query(sql)
        .then(result =>{
            const dadata = [];
            result[0].forEach(element => {
                console.log(element.sguid)
                dadata.push()
            });

            return result[0];
          })
          .catch(err =>{
            console.log(err);
          });
    } catch (error) {
        throw new Error('Failed to execute MySQL query');
    }
}

exports.getUser = async (req, res) => {
    try {
        if(req.params.id !== 'favicon.ico' && req.params.id !== 'jwt')
        {
            var sql=`SELECT * FROM quest_bot where id = ${req.params.id}`;

            return await db.query(sql)
            .then(result =>{
                if (result[0].length > 0)
                {
                    return result[0];
                }
                else
                {
                    return 0;
                }
            })
            .catch(err =>{
                console.log(err);
            });
        }
        else
        {
            return {error : "error", mesage: err};
        }
    } catch (error) {
        
        throw new Error('Failed to execute MySQL query');
    }
}

exports.setUser = async (req, res) => {
    try
    {
        var sql=`INSERT INTO quest_bot (name, nicname, ansver_true, ansver_false) VALUES (?,?,?,?)`;

        return await db.query(sql, [req.body.name, req.body.nicname, req.body.ansver_true, req.body.ansver_false])
        .then(result =>{
           console.log(result[0]);
           return result[0];
          })
          .catch(err =>{
            console.log(err);
          });
    } 
    catch (error) 
    {
        throw new Error('Failed to execute MySQL query');
    }
}

exports.updateUser = async (req, res) => {
    try
    {
        var sql=`UPDATE quest_bot SET name = ?, nicname = ?, ansver_true = ?, ansver_false = ? WHERE id = ?`;

        return await db.query(sql, [req.body.name, req.body.nicname, req.body.ansver_true, req.body.ansver_false, req.body.id])
        .then(result =>{
           console.log(result[0]);
           return result[0];
          })
          .catch(err =>{
            console.log(err);
          });
    } 
    catch (error) 
    {
        throw new Error('Failed to execute MySQL query');
    }
}

exports.deleteUser = async (req, res) => {
    try
    {
        var sql=`DELETE FROM quest_bot WHERE id = ?`;

        return await db.query(sql, [req.params.id])
        .then(result =>{
           console.log(result[0]);
           return result[0];
          })
          .catch(err =>{
            console.log(err);
          });
    } 
    catch (error) 
    {
        throw new Error('Failed to execute MySQL query');
    }
}