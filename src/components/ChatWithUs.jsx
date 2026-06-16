const style = {
    position: 'fixed',
    bottom: "50px",
    right: '30px',
    cursor: 'pointer',
    zIndex: 999,
    boxShadow: '4px 4px 4px #9E9E9E',
    // maxWidth: '50px'
}

const ChatWithUs = () => {
    return (
        <div style={style} className='position-fixed bg-primary m-2 p-2 rounded-pill'>
            <a target={"_blank"} rel={"noreferrer"} className='text-white text-decoration-none' href="https://wa.me/2348034262759">Chat with Us</a>
        </div>
    );
}

export default ChatWithUs;