export async function fetchCommunityHelpers() {
  const response = await fetch('https://randomuser.me/api/?results=4&nat=ca,us');

  if (!response.ok) {
    throw new Error('Unable to load community helper profiles right now.');
  }

  const data = await response.json();

  return data.results.map((person, index) => ({
    id: `${person.login.uuid}-${index}`,
    name: `${person.name.first} ${person.name.last}`,
    email: person.email,
    city: person.location.city,
    image: person.picture.medium,
  }));
}
