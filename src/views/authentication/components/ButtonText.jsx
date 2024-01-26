export default ({ text, href }) => {
  return (
    <>
      <a href={href} className='link-underline-light pt-4'>
        {text}
      </a>
    </>
  );
};
