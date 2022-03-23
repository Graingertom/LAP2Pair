const db = require('../dbConfig/init')

class Post {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.pseudonym = data.pseudonym
        this.content = data.content
        this.url = data.url
    }

    static addPost(postData){
        return new Promise (async(resolve,reject) => {
            try{
                let pd = postData.json
                let blogData = await db.query(`INSERT INTO blogs VALUES (id, title, pseudonym, content) VALUES (
                    ${pd.id},${pd.name},
                    ${pd.pseudonym},${pd.content}
                ) RETURNING *;`)
                let post = new Post(blogData.rows[0])
                resolve(post)
            } catch (err) {
                reject('Could not add blog post')
            }
        })
    }

    static get All() {
    return new Promise (async (resolve, reject) => {
        try {
            let blogData = await db.query(`SELECT * FROM blogs;`);
            let blog = blogData.rows.map(b => new Post(b));
            resolve (blog);
        } catch (err) {
            reject(err)
        }
    });
};

    static getByUrl(url){
        return new Promise (async (resolve,reject) =>{
            try{
                let getBlogDataByUrl = await db.query('SELECT * FROM blogs WHERE url = $1',[url])
                resolve(getBlogDataByUrl)
            } catch (e) {
                reject(e)
            }
        })
    }
    
    

}

module.exports = Post;
