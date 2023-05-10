
const MenuItem = ({item}) => {
    return (
        <div>
            <img src={item.image} alt="No image available." style={{height:"150px", width:"auto"}} />
            <h4>{item.name} - {item.price}</h4>
            <p>{item.description}</p>
        </div>
    )
}

export default MenuItem