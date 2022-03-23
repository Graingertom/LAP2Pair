
class Post {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.pseudonym = data.pseudonym
        this.content = data.content
        this.url = data.url
    }

    static async addPost(postData){
        return new Promise (async(resolve,reject) => {
            try{
                let pd = postData.json
                let blogData = db.query(`INSERT INTO blogs VALUES (id, title, pseudonym, content) VALUES (
                    ${pd.id},${pd.name},
                    ${pd.pseudonym},${pd.content}
                ) RETURNING *;`)
                let post = new Post(blogData.rows[0])
                resolve(post)
            } catch {
                reject('Could not add blog post')
            }
        })
    }

}
