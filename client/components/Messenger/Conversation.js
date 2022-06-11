import React from 'react';

export default function Conversation ({ conversation, currentUser }) {
  console.log("CURRENT USER", currentUser)
  const [user, setUser] = useState(null)
 
  useEffect(() => {
    const friendId = (conversation.receiverId || conversation.senderId) !== currentUser.id
    console.log("FRIEND ID", friendId)
    
    const getUser = async() => {
      
      try{
        const response = await axios(`/api/users/${friendId}`)
        console.log("RESPONSE IN CONVERSATION", response)
        setUser(response.data)
      }
      catch(err) {
        console.log(err)
      }
    }
    getUser();
  }, [currentUser, conversation])

  return (
    <div className='conversation'>
      <img 
        className='conversationImg' 
        src='https://www.w3schools.com/howto/img_avatar2.png' alt='' />
      <span className='conversationName'>{user.username}</span>
    </div>
  )
}