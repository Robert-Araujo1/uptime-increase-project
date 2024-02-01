export default () => {
  return (
    <div class='dropdow'>
      <a
        class='btn btn-secondary dropdown-toggle btn-sm'
        href='#'
        role='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'>
        Selecione o status
      </a>

      <ul class='dropdown-menu dropdown-menu-lg-end'>
        <li>
          <a class='dropdown-item' href='#'>
            Atendido
          </a>
        </li>
        <li>
          <a class='dropdown-item' href='#'>
            Em atendimento
          </a>
        </li>
        <li>
          <a class='dropdown-item' href='#'>
            Não atendido
          </a>
        </li>
      </ul>
    </div>
  );
};
