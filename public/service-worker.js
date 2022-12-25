// import { registerRoute } from "workbox-routing";

self.addEventListener("fetch", async (event) => {
    const url = new URL(event.request.url);

    // console.log(event.request.method, url.pathname);
    if (event.request.method === "POST" && url.pathname === "/share") {
        try {
            const req = event.request.clone();
            const formData = await req.json();
            console.log("Form Data: ", formData);
        } catch (e) {
            console.log(e);
        }

        try {
            const req = event.request.clone();
            const formData = await req.formData();
            console.log("Form Data: ", formData);
        } catch (e) {
            console.log(e);
        }

        console.log("Handling /share req in service worker");
        // event.respondWith("Handling...");

        event.respondWith(
            (async () => {
                // const formData = await event.request.json();
                // console.log("Form Data: ", formData);
                //         const link = formData.get("link") || "";
                //         const responseUrl = await saveBookmark(link);
                //         return Response.redirect(responseUrl, 303);
                return Response.redirect("/transactions/add", 303);
            })()
        );
    }
});

// async function handleShare({ event }) {
//     const formData = await event.request.formData();
//     const mediaFiles = formData.getAll("media");
//     console.log("Form Data: ", mediaFiles);
//
//     return Response.redirect("/transactions/add", 303);
// }
//
// registerRoute("/share", handleShare, "POST");
