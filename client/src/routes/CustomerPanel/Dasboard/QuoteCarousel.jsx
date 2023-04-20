import React, { useState, useEffect } from 'react'


function QuoteCarousel() {

	const quotes = [
		{
			quote: "Our dedicated partners at BTG have truly become a part of the fabric of Heidrick & Struggles. They are knowledgable, collaborative, responsive, and overall a great complement to the high-level of work that clients have come to expect from H&S.",
			author: "— Emily G., Strategic Accounts & Specialty Practices Manager, Heidrick & Struggles"
		},
		{
			quote: "Business Talent Group have helped us provide on-demand access to independent business consulting talent and teams... Their strength is in their network of vetted and qualified talent as well as thought leadership and partnership in developing solutions.",
			author: "— Executive Sponsor in Outsourcing/Offshoring at a Multinational Enterprise Client"
		},
		{
			quote: "One of the great strengths of the gig economy is the wide variety of skills in the market. Second is the price. Third is the flexibility: you can plug independents into different team sizes and structures.",
			author: "— Dan Lee, Former Vice President of Pfizer's Consulting and Execution Group (PCE)"
		},
		{
			quote: "Sometimes, when you work with outside consultants, there’s a lot of back-and-forth about what the problem really is. BTG heard our requirements and identified the right person, not only from the standpoint of technical competency but in terms of personality and fit.",
			author: "— Tim Hylan, VP of Pfizer's Internal Medicine Field Medical Director Group"
		},
		{
			quote: "Very fit-for-purpose and tailored to our needs. Appreciated them using existing information from previous work rather than replicating the work.",
			author: "— Vice President at a Fortune 500 Life Science Company"
		},
		{
			quote: "I was very pleased with the BTG process, our BTG partner...and the consultant we worked with. It was an easy and flexible process and was a pleasure to go through.",
			author: "— Senior Director, Global Product Development at a Fortune 500 Life Science Company"
		},
		{
			quote: "High value, incorporated very easily into the team, strong industry expertise.	",
			author: "— Corporate Strategy Leader at a Fortune 100 Technology Company"
		}
	];

	const [quoteData, getQuoteData] = useState(quotes)
	const [current, setCurrent] = useState(0)
	const [quote, getQuote] = useState(quoteData[current])

	useEffect(
		() => getQuote(quoteData[current]),
		[current, quote]
	)

	const nextQuote = () => {
		current === quoteData.length - 1 ?
			setCurrent(0)
			:
			setCurrent(current + 1)
	}

	const prevQuote = () => {
		current === 0 ?
			setCurrent(quoteData.length - 1)
			:
			setCurrent(current - 1)
	}

	const dotPicksQuote = (e) => setCurrent(Number(e.target.id))

	console.log(current)
	return (
		<section className='my-8 opacity-80'>
			<div className="slideshow-container mx-auto rounded-tl-lg rounded-tr-lg">
				<Slide quote={quote} />
				<Arrows nextQuote={nextQuote} prevQuote={prevQuote} />
			</div>
			<Dots dotQty={quoteData} current={current} dotPicksQuote={dotPicksQuote} />
		</section>
	)
}

function Slide({ quote }) {
	return (
		<div className="mySlides">
			<q>{quote.quote}</q>
			<p className="author">&mdash;{quote.author}</p>
		</div>
	)
}

function Arrows({ nextQuote, prevQuote }) {
	return (
		<>
			<a onClick={prevQuote} className="prev" id="prev">&#10094;</a>
			<a onClick={nextQuote} className="next" id="next">&#10095;</a>
		</>
	)
}

function Dots({ dotQty, current, dotPicksQuote }) {
	return (
		<div className="dot-container mx-auto rounded-bl-lg rounded-br-lg">
			{
				dotQty.map((dot, i) => {
					return <span id={i} className={current === i ? "dot active" : "dot"} onClick={dotPicksQuote}></span>
				})
			}
		</div>
	)
}

export default QuoteCarousel