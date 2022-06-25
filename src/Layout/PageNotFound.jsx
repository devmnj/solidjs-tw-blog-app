import Layout from ".";
import PNF from '../components/PNF'
export default function PageNotFound(){
    return (<>
    <Layout>
        <div class="container h-screen align-bottom max-w-6xl p-6 mx-auto space-y-6 sm:space-y">            
            {/* <h1 class="2xls">Page Not Found</h1> */}
            <PNF/> 
        </div>
    </Layout>
    </>)
}