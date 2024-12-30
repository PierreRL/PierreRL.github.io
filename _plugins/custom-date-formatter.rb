require 'time' # Ensure Time parsing is available

module Jekyll
  module OrdinalDate
    def format_date(input)
      # Parse input to a Time object if it is a String
      date = input.is_a?(String) ? Time.parse(input) : input

      day = date.strftime("%-d").to_i
      suffix = case day % 10
               when 1 then (day % 100 == 11 ? "th" : "st")
               when 2 then (day % 100 == 12 ? "th" : "nd")
               when 3 then (day % 100 == 13 ? "th" : "rd")
               else "th"
               end
      date.strftime("%b #{day}#{suffix}, %Y")
    end
  end
end

Liquid::Template.register_filter(Jekyll::OrdinalDate)