import BannerPageContent from "components/views/banners/banner";
import Head from "next/head";
import { useRouter } from "next/router";

function EditAdPage(props) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>Edit Banner</title>
      </Head>
       <BannerPageContent id={id} />
    </>
  );
}


export default EditAdPage;


EditAdPage.layout = "dashboard";
