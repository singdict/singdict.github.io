<div class="about-container">
    <h1>About the SingDict project</h1>
    <p class="text-left">
        Welcome to our website! SingDict is an open-source dictionary of
        Singlish terms built upon definitions generated by ChatGPT and
	edited by us. It  includes entries from the <a
            href="https://bond-lab.github.io/NTUMC/"
            target="_blank"
            title="Wordnet">NTUMC Wordnet</a>
        and Wiktionary,  with more entries contributed
	by native speakers of Singlish.
    </p> 
   <p class="text-left">  	   
        The data is hosted on our
        <a  href="https://github.com/singdict/SingDict"
            target="_blank"
            title="Link to SingDict GitHub">GitHub page</a>
        under the CC BY SA 4.0 license. The page also hosts the data used for
        the dictionary which can be found 
        <a
            href="https://github.com/singdict/SingDict/tree/master/vocabulary"
            target="_blank"
            title="SingDict data">here</a>.
    </p>
   <p class="text-left">  	   
        Thank you for visiting our About page. We welcome contributions through
        our <a href="/contribute">Contribute</a> page!
    </p>
   <hr>
   <br>
   <p class="text-left">  	   
        The interface for this website is based on the <a
            href="https://github.com/amitsingh19975/Vocabulary-App"
            target="_blank"
            title="GitHub link to the Vocabulary-App">Vocabulary-App</a>.
	    The icon used for this website was created by
        <a
            href="https://thenounproject.com/creator/nsw.weuy"
            target="_blank"
            title="user Rabbit Jes">Rabbit Jes</a>
        and obtained from
        <a
            href="https://thenounproject.com/icon/singapore-4007320/"
            target="_blank"
            title="the noun project">The Noun Project</a>
	    under the creative commons attribution license (CC BY 3.0).
    </p>

</div>

<svelte:head>
    <title>About SingDict</title>
    <meta name="description" content="about singdict" />
</svelte:head>

<style>
    .about-container {
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
