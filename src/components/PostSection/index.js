import React, { useState, useEffect } from 'react'
import './index.css'
import Comments from './Comments/comments.js'
import Post from './SinglePost/post.js'
import Write from './Write/write.js'
import {
    useParams
} from "react-router-dom";
import {PORT} from '../../CONSTANTS'
// import { useHistory } from 'react-router-dom'
import {Page404Element} from '../../pages/index'

// let tempcommentsREF = [
//     {user: 'cootneyiscoolerthanbrandon', 
//     time: 'Dec 4 2020, 4:20 PM', 
//     content: "It's spelled fossit not faucet you dingleberry! BEAATCH! WOWSER!",
//     upvotes: -69420,
//     commentID: 'rawrxd'
//     },
//     {user: 'Brandon', 
//     time: 'Dec 4 2020, 4:20 PM', 
//     content: "In in volutpat nisl. Etiam id sem non nisl tincidunt rutrum in hendrerit sapien. Aliquam finibus ante id sapien dictum, et sodales est ultrices. Integer lacinia lobortis nibh, non posuere diam pretium",
//     upvotes: 200000,
//     commentID: 'rawrxd'
//     },
//     {user: 'Taylor from Ops', 
//     time: 'Dec 4 2020, 4:20 PM', 
//     content: "Lmao look at Courtney's downvotes",
//     upvotes: 1120,
//     commentID: 'rawrxd'
//     },
// ]

// let temppostREF = {
//     user: "foobar97",
//     title: "Joe Mama's Body",
//     content: `Gibbons (/ˈɡɪbənz/) are apes in the family Hylobatidae (/ˌhaɪləˈbætɪdiː/). The family historically contained one genus, but now is split into four extant genera and 18 species. Gibbons live in subtropical and tropical rainforest from eastern Bangladesh to Northeast India to southern China and Indonesia (including the islands of Sumatra, Borneo, and Java).

//     Also called the lesser apes or small apes, gibbons differ from great apes (chimpanzees, bonobos, gorillas, orangutans and humans) in being smaller, exhibiting low sexual dimorphism, and not making nests.[3] Like all apes, gibbons are tailless. Unlike most of the great apes, gibbons frequently form long-term pair bonds. Their primary mode of locomotion, brachiation, involves swinging from branch to branch for distances up to 15 m (50 ft), at speeds as high as 55 km/h (34 mph). They can also make leaps up to 8 m (26 ft), and walk bipedally with their arms raised for balance. They are the fastest and most agile of all tree-dwelling, nonflying mammals.[4]
    
//     Depending on the species and sex, gibbons' fur coloration varies from dark to light brown shades, and any shade between black and white, though a completely "white" gibbon is rare.`,
//     flair: 'Orangutans',
//     upvotes: 69,
//     postID: 'XXX',
//     time: 'Dec 8888, 12:19 PM'

// }

//let tempLoggedUser = "Eggert"

//FETCH FROM WITHIN POSTSECTION

const PostSection = () => {
    // let { ticker } = useParams()
    const [username, setUser] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
        else { setUser("Anonymous") }
      }, []);

    let { postID } = useParams()

    //const post = fetch post
    //const comments = fetch comments
    const [tempcomments, setComments] = useState([])
    const [temppost, setPost] = useState(null)

    const [loadedcomments, load1] = useState(null)
    const [loadedpost, load2] = useState(null)

    const [error, seterror] = useState(null)

    useEffect(() => {
        //FETCH POST HERE BASED ON TICKER/POSTID
        //FETCH COMMENTS HERE ONE TIME

        fetch(`${PORT}/singlepost?postID=${postID}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setPost({
                user: data.user,
                title: data.title,
                content: data.content,
                flair: data.flair,
                upvotes: data.upvotes,
                postID: postID,
                time: data.time,
                ticker: data.ticker,
            })
            setComments(data.comments)
            load2(true)
        })
        .catch(function() {
            seterror(true)
        });
        
        // setComments(tempcommentsREF)
        // setPost(temppostREF)
    }, [])

    const modifyUpvote = (amt) => { //Need a setter function to be passed in for upvotes
        let modifiedPost = temppost

        modifiedPost.upvotes += amt

        setPost(modifiedPost)
    }

    if (error){
        return(<Page404Element/>)
    }
    else if (!loadedpost)
        return(<div/>)
    // console.log(temppost)
    return(
        <div id="post-container">
            <Post post={temppost} modifyUpvote={modifyUpvote}/>
            <Write comments={tempcomments} setComments={setComments} loggeduser={username}/>
            <Comments comments={tempcomments}/>
        </div>
    )
}

export default PostSection