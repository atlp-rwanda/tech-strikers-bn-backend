import list from "../database/config/tokenlist"
import tokenlist from "../services/index"
export default class tokenListController {
    static async listed(req, res) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearertoken  = bearer[1];           
            const tt= bearertoken+"";            
            const listtoken=tokenlist.AddToList(tt); 
            return res.status(200).json({message:"Logout success fully"});

        }else{
            return res.status(403).json({message:"you Loged out?"})
        }
    }
}
