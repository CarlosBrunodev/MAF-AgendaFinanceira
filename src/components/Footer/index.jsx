
 function toggleFooterSection(e) {
  const list = e.target.parentElement.parentElement.querySelector(
    "article"
  );
  if (list.classList.contains("h-0")) {
    list.classList.remove("h-0");
  } else {
    list.classList.add("h-0");
  }
}

import Link from "next/link"

const Footer = ({props}) => (
  <footer className="mt-16 bottom-0 w-full">
      <div className="border-t md:px-4 md:pt-10 md:pb-5">
        <div className="flex flex-wrap md:max-w-screen-lg mx-auto">
          <section
            className="relative text-gray-700 font-light font-light border-b px-6 pb-4 md:py-3 w-full md:border-none md:w-1/4"
          >
            <div className="md:hidden">
              <button
                onClick={() => toggleFooterSection(event)}
                className="uppercase text-xs font-bold tracking-wider text-pink-700 focus:outline-none border-t border-white py-4 w-full text-left"
                type="button"
              >
                Empresa
              </button>
            </div>
            <a
              className="uppercase text-xs border-l-4 border-yellow-500 p-2  font-bold tracking-wider text-pink-700 hidden md:block"
              href="#"
            >
              Empresa
            </a>
            <article className="h-0 md:h-auto -mt-4 md:mt-0 overflow-hidden">
              <ul className="my-5 text-sm tracking-wide">
                <li className="my-3 tracking-wide">
                  <a href="#">Sobre nós</a>
                </li>
                <li className="my-3 tracking-wide">
                  <a href="#">Compromisso</a>
                </li>
                <li className="my-3 tracking-wide">
                  <a href="#">Carreiras</a>
                </li>
                <li className="my-3 tracking-wide">
                  <a href="#"> Entre em contato conosco</a>
                </li>
              </ul>
            </article>
          </section>

          <section
            className="relative text-gray-700 font-light font-light border-b px-6 pb-4 md:py-3 w-full md:border-none md:w-1/4"
          >
            <div className="md:hidden">
              <button
                   onClick={() => toggleFooterSection(event)}
                className="uppercase text-xs border-blue-500 font-bold tracking-wider text-pink-700 focus:outline-none border-t border-white py-4 w-full text-left"
                type="button"
              >
               Serviços
              </button>
            </div>
            <a
              className="uppercase border-l-4 border-yellow-500 p-2  text-xs font-bold tracking-wider text-pink-700 hidden md:block"
              href="#"
            >
             Serviços
            </a>
            <article className="h-0 md:h-auto -mt-4 md:mt-0 overflow-hidden">
              <ul className="my-5 text-sm tracking-wide">
                <li className="my-3 tracking-wide">
                  <a href="#">Agendamentos</a>
                </li>
                <li className="my-3 tracking-wide">
                  <a href="#">Calendario</a>
                </li>
                <li className="my-3 tracking-wide">
                  <a href="#">Notificação</a>
                </li>
                <li className="my-3 tracking-wide">
                  <a href="#">Contas a pagar</a>
                </li>
                <li className="my-3 tracking-wide">
                  <a href="#">Contas a receber</a>
                </li>
              </ul>
            </article>
          </section>
         
          <section
            className="relative text-gray-700 font-light font-light border-b px-6 pb-4 md:py-3 w-full md:border-none md:w-1/4"
          >
            <div className="md:hidden">
              <button
                   onClick={() => toggleFooterSection(event)}
                className="uppercase text-xs font-bold tracking-wider text-pink-700 focus:outline-none border-t border-white py-4 w-full text-left"
                type="button"
              >
                Minha conta
              </button>
            </div>
            <a
              className="uppercase text-xs border-l-4 border-yellow-500 p-2  font-bold tracking-wider text-pink-700 hidden md:block"
              href="#"
            >
              Minha conta
            </a>
            <article className="h-0 md:h-auto -mt-4 md:mt-0 overflow-hidden">
              <ul className="my-5 text-sm tracking-wide">
                <li className="my-3 tracking-wide">
                  <a href="#">Meu perfil</a>
                </li>
                <li className="my-3 tracking-wide">
                  <a href="#">Entrar</a>
                </li>
                <li className="my-3 tracking-wide">
                  <a href="#">Cadastrar-se</a>
                </li>
              </ul>
            </article>
          </section>

          <section
            className="relative text-gray-700 font-light font-light border-b px-6 pb-4 md:py-3 w-full md:border-none md:w-1/4"
          >
            <div className="md:hidden">
              <button
                   onClick={() => toggleFooterSection(event)}
                className="uppercase text-xs font-bold tracking-wider text-pink-700 focus:outline-none border-t border-white py-4 w-full text-left"
                type="button"
              >
                Links
              </button>
            </div>
            <a
              className="uppercase text-xs border-l-4 border-yellow-500 p-2  font-bold tracking-wider text-pink-700 hidden md:block"
              href="#"
            >
              Links
            </a>
            <article className="h-0 md:h-auto -mt-4 md:mt-0 overflow-hidden">
              <ul className="my-5 text-sm tracking-wide">
                <li className="my-3 tracking-wide">
                  <a href="#">Linkedin</a>
                </li>
                <li className="my-3 tracking-wide">
                  <a href="#">Instagram</a>
                </li>
                <li className="my-3 tracking-wide">
                  <a href="#">Facebook</a>
                </li>
                <li className="my-3 tracking-wide">
                  <a href="#">Twitter</a>
                </li>
              </ul>
            </article>
          </section>
        
         
        </div>
      </div>
      <div className="bg-gray-700 border-none px-4 text-white">
        <section
          className="max-w-screen-lg mx-auto flex flex-col md:flex-row md:justify-between md:border-solid md:border-t text-gray-700 font-light text-sm pt-4 pb-6 md:pt-5 md:pb-6 w-full"
        >
          <div>
            <p className="leading-8 tracking-wide text-white">
              &copy; Minha agenda digital Co., 123 Lorem Street, Fortaleza
            </p>
          </div>
          <div>
            <p className="leading-8 tracking-wide text-white "><Link href="/termos"target="_blank"><a target="_blank" >Politicas de privacidade / Termos de uso</a></Link></p>
          </div>
        </section>
      </div>
    </footer>
    
     
  
)

export default Footer