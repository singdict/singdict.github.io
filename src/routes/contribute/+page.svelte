<div class="contribute-container">
    <h1>Contribute your Singlish knowledge!</h1>
    <p>
        As many of our entries come directly from ChatGPT, it is difficult to
        ensure the quality of each of them. If you would like to contribute
        towards this dictionary, whether you'd like to add a new entry, correct
        existing entries or add in some detail e.g., language of origin to
        enhance them, please send an issue to our GitHub <a
            href="https://github.com/singdict/SingDict/issues/new/choose"
            target="_blank"
            title="Link to SingDict GitHub Issues Page">here</a
        >.
    </p>
    <p>
        Please choose the one of the existing templates coresponding to the
        suggestion you would like to make and we will see to it as soon as
        possible. Thank you!
    </p>
</div>

<svelte:head>
    <title>Contribute</title>
    <meta name="description" content="contribute" />
</svelte:head>

<style>
    .contribute-container {
        max-width: 800px;
        margin: 40px auto 0 auto;
        padding: 20px;
        text-align: center;
    }

    h1 {
        color: #d1d9e0;
        font-size: 2em; /* Adjust the size as needed */
        font-weight: 450; /* Medium font weight */
        margin-bottom: 12px;
    }

    p {
        color: #d1d9e0;
        line-height: 1.6;
        font-size: 1em; /* Standard paragraph size */
        font-weight: 400; /* Normal font weight */
        margin-bottom: 20px; /* Adds space between paragraphs */
    }
    a {
        color: #5cb1dc; /* Bright color for visibility (e.g., Tomato) */
        /* font-weight: bold; Make the link text bold */
        /* text-decoration: underline; Underline the link */
        transition: color 0.3s ease; /* Smooth transition for color change */
    }

    a:hover {
        color: #3b6dcb; /* Slightly darker color on hover (e.g., OrangeRed) */
        text-decoration: underline; /* Ensure underline on hover */
    }
</style>
