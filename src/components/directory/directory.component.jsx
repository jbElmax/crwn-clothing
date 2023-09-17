import './directory.styles.scss'
import DirectoryItem from "../directory-item/directory-item.component";

  const categories = [
  {
    "id": 1,
    "title": "hats",
    "imageUrl": "https://source.unsplash.com/6NVrH0HB_DE",
    "route":"shop/hats"
  },
  {
    "id": 2,
    "title": "jackets",
    "imageUrl": "https://source.unsplash.com/P0W27GRvyww",
    "route":"shop/jackets"
  },
  {
    "id": 3,
    "title": "sneakers",
    "imageUrl": "https://source.unsplash.com/iOv3CqiZLtE",
    "route":"shop/sneakers"

  },
  {
    "id": 4,
    "title": "womens",
    "imageUrl": "https://source.unsplash.com/eFRh6onp24Q",
    "route":"shop/womens"
  },
  {
    "id": 5,
    "title": "mens",
    "imageUrl": "https://source.unsplash.com/TwuPHbcQ57w",
    "route":"shop/mens"
  }
]

const Directory = () => {
    return(
     <div className="directory-container">
      {categories.map((category)=>{
        
        return(
          <DirectoryItem key={category.id} category={category}/>
        );
      })
      }

    </div>
    )
}

export default Directory;