
interface SuggestionsResponse {
  suggestions: Suggestion[];
}


interface Suggestion{
  placePrediction: PlacePrediction
}

interface PlacePrediction {
  place?: string;
  placeId: string;
  text?: TextContent;
  structuredFormat?: StructuredFormat;
  types?: string[];
}

interface TextContent {
  text?: string;
  matches?: Match[];
}

interface StructuredFormat {
  mainText?: TextContent;
  secondaryText?: TextContent;
}

interface Match {
  startOffset?: number;
  endOffset?: number;
}



interface Location {
  formatted_address: string;
  geometry: {
      location: {
          lat: number;
          lng: number;
      };
  };
}