export function Header({
  title = "Title Page",
  subheading = "This is the subheading for the page you're on",
}) {
  return (
    <div className='title-header'>
      <h2>{title}</h2>
      <h5>{subheading}</h5>
    </div>
  );
}
