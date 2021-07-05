import Head from "next/head";
import Header from "../components/Header";
import Heading, { HeadingLine } from "../components/Heading";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Slider from "react-slick";
import Banner from "../components/Banner"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextSession ,{TextSessionInvert } from "../components/TextSession";


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000
};

export default function Home({ initialUsers }) {
  return (
    <>
      <Header title="Minha agenda digital" color="bg-blue-500" />
      <div className="relative">
        <Slider {...settings}>
          <Banner img="https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">
            <Heading size="text-6xl" color="text-white" weight="font-bold" spacing="tracking-wide">
              Planeje suas finanças.
            </Heading>
          </Banner>

          <Banner img="https://images.unsplash.com/photo-1585398999889-2fea45c6cc11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80">
            <Heading size="text-6xl" color="text-white" weight="font-bold" spacing="tracking-wide">
              Crie seus objetivos.
            </Heading>
          </Banner>

          <Banner img="https://images.unsplash.com/photo-1585399000684-d2f72660f092?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80">
            <Heading size="text-6xl" color="text-white" weight="font-bold" spacing="tracking-wide">
              Acompanhe seus relatorio.
            </Heading>
          </Banner>
        </Slider>
      </div>

      <TextSession>
          Minha agenda financeira é um sistema de controle financeiro pessoal ou empresarial 
          online descomplicado. Foi criado em 2020, como uma solução simples para os problemas 
          do dia a dia de microempresas e autônomos. A ideia nasceu através das dificuldades 
          de gerenciamento das atividades do dia a dia com as finanças e clientes. 
          Inicialmente desenvolvido para smartphones, a MAF cresceu para a web para 
          facilitar ainda mais o seu uso. Utilizando conceitos de mídia social, 
          design simples e bonito, todos os dados estão totalmente sincronizados 
          e seguros utilizando tecnologia da nuvem.
      </TextSession>

      <TextSessionInvert color="bg-gray-200">
        LGPD: sua segurança e a dos seus dados em primeiro lugar!
        A MAF possui medidas técnicas e administrativas com o objetivo de proteger seus dados pessoais,
        de acordo com a Lei Geral de Proteção de Dados (LGPD). 
        Temos funcionalidades nas quais você tem total controle sobre os seus dados.
      </TextSessionInvert>

      <div className="container max-w-7xl mx-auto my-10 px-4 sm:px-6">
        {/* <HeadingLine size="text-2xl" lineColor="border-blue-500">
          Site institucional / Apresentação
        </HeadingLine> */}
        {/* {initialUsers.map((item) => item.user_name)} */}
      </div>

      <Footer />

    </>
  );
}
