import Head from "next/head";

const PurchaseSuccessPage = () => (
  <div className="flex-1 flex p-8 justify-center text-center">
    <Head>
      <title>Thank you!</title>
    </Head>
    <div>
      <h1 className="text-5xl font-bennet-banner">
        Thank you for your purchase 🎉
      </h1>
      <p className="text-lg font-catamaran">
        The &quot;Birth Plan Assist&quot; will be emailed to you shortly.
      </p>
    </div>
  </div>
);

export default PurchaseSuccessPage;
