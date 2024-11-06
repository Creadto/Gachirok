

interface RealEstatePageProps {
  params: {
    countryCode: string;
  };
}

export default function RealEstatePage({ params }: RealEstatePageProps) {
  const { countryCode } = params;

  return (
    <div>
      <GoogleMapAutocomplete />
    </div>
  );
}
