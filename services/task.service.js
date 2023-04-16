var db = require('../models/mysql.model');

exports.getTasks = async () => {
    try {
        var sql_status = 'SELECT * FROM progressdb.task_status';
        var sql_items='SELECT task_items.guid, task_items.task, task_items.description , task_status.guid as sguid, task_status.title FROM task_items INNER JOIN task_status ON task_items.status = task_status.id';
        var dacols = await db.query(sql_status).then(result =>{return result[0]}).catch(err =>{console.log(err)});
        var daitems = await db.query(sql_items).then(items => {return items[0]}).catch(err =>{console.log(err);})
        var col = {};
        dacols.forEach(cl => {
            col[cl.guid] = {title: cl.title, items:[]};
            daitems.forEach(it => {
                if(it.sguid === cl.guid)
                {
                    col[cl.guid].items.push({id: it.guid, Task: it.task, Description: it.description, Due_Date: '25-May-2023'})
                }
            })
        })
        return col;
    } catch (error) {
        throw new Error('Failed to execute MySQL query');
    }
}

exports.getStatus = async () => {
    try {
        var sql_status = 'SELECT * FROM progressdb.task_status';
        var dacols = await db.query(sql_status).then(result =>{return result[0]}).catch(err =>{console.log(err)});
        return dacols;
    } catch (error) {
        throw new Error('Failed to execute MySQL query');
    }
}

exports.getTask = async (req, res) => {
    try {
        //console.log(req.params);
        if(req.params.id !== 'favicon.ico' && req.params.id !== 'jwt')
        { 
            var sql=`SELECT task_items.guid, task_items.task, task_items.description , task_status.guid as sguid, task_status.title, task_status.id FROM task_items INNER JOIN task_status ON task_items.status = task_status.id WHERE task_items.guid = ?`
            return await db.query(sql, [req.params.guid])
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

exports.setTasks = async (req, res) => {
    try
    {
        var sql_status = 'SELECT id FROM progressdb.task_status WHERE guid = ?';
        var dacols = await db.query(sql_status, [req.body.status]).then(result =>{return result[0]}).catch(err =>{console.log(err)});

        var sql=`INSERT INTO task_items (guid, task, description, status) VALUES (?,?,?,?)`;
        return await db.query(sql, [req.body.guid, req.body.task, req.body.description, dacols[0].id])
        .then(result =>{return result[0]}).catch(err =>{console.log(err)});
    } 
    catch (error) 
    {
        throw new Error('Failed to execute MySQL query');
    }
}

exports.updateTask = async (req, res) => {
    try
    {
        const {guid, status} = req.body;
        sql_id_status = `SELECT id FROM task_status WHERE guid = ?`;
        var id = await db.query(sql_id_status, [status]).then(result =>{return result[0]}).catch(err =>{console.log(err)});
        var sql=`UPDATE task_items SET status = ? WHERE guid = ?`;
        
        return await db.query(sql, [id[0].id, guid])
        .then(result =>{
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

exports.deleteTask = async (req, res) => {
    try
    {
        var sql=`DELETE FROM task_items WHERE guid = ?`;
        console.log(req.params);
        return await db.query(sql, [req.params.id])
        .then(result =>{
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