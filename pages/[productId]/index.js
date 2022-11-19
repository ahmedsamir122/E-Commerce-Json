import { async } from "@firebase/util";

function ProductDetails (props) {
    return <h2>{props.products.title}</h2>
}
export async function getStaticPaths(){
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    const paths = data.products.map(item => {
        return{
            params:{ productId:item.id.toString() }
        }
    })
    return{
        paths: paths,
        fallback:false
    }
}

export async function getStaticProps(context){

    const projectId= context.params.productId
    const res = await fetch('https://dummyjson.com/products/' + projectId)
    const data = await res.json();


    return{
        props:{
            products:data
        },
        revalidate:1
    }
}
export default ProductDetails;

