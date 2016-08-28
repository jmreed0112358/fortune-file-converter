# Fortune File Converter.

# Current and new format.

This program is intended to take a file database of fortune quotes and convert each file to an array of json objects.

The original format:
e.g.

This is a quote
	-- This is the author of the quote.
%%
This is the next quote.
	-- This is the author.
%%

And so forth. Each quote is a block of text, terminated by a pair of '%' followed by a new line character.

The new JSON format will be an array of quote objects.  

The JSON format:
e.g.

[
	{
		"text": "This is a quote",
		"author": "This is the author"
	},
	{
		"text": "This is the next quote",
		"author": "This is the author"
	{
]

# UI

-- Processing loop.

For each file:
	For each quote in the file:
		Ask the user if this quote should be converted.
			If the quote should be converted
				Process the quote.
				If there were any errors
					Inform the user.
				Else
					Add the quote to the output array.
			Else
				Skip to the next quote.
	Write output array to file, go to the next data file. 

# Components:
	fortune-converter: Processes quotes. Program 'main'
	input-manager: Abstraction wrapper for readline.
	file-manager: Abstraction for file loading/reading/writing.

	input-manager and file-manager are abstractions intended to make mocking easier.
