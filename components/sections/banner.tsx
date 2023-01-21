import React, { useEffect, useState } from "react";
import Container from "../container";
import Button from "../elements/Button";
import { motion } from "framer-motion";

const data = [
  {
    title: "Where engineering and technology meet agriculture",
    image:
      "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
  },
  {
    title: "Where engineering and technology meet agriculture",
    image:
      "https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2129&q=80",
  },
];

const bigContainer = {
  hidden: { y: -20, scale: 0.9 },
  show: {
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
    },
  },
};
const container = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const itemsAni = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

let curActive = 0;
const Banner = () => {
  let timer: any;
  const [active, setActive] = useState<number>(0);

  //   useEffect(() => {
  //     setInterval(() => {
  //       if (active === data.length - 1) {
  //         setActive(0);
  //       } else {
  //         setActive((prev) => prev++);
  //       }
  //     }, 6000);
  //   }, []);

  useEffect(() => {
    if (window) {
      timer = window?.setInterval(() => {
        if (curActive + 1 === data.length) {
          curActive = 0;
          setActive(0);
        } else {
          curActive++;
          setActive((prev) => prev + 1);
        }
      }, 4000);
    }
    return () => window?.clearInterval(timer);
  }, []);

  return (
    <section className="pb-2 relative">
      {/* <button onClick={changeActive}>change</button> */}
      {data.map((item, index) => {
        if (active === index)
          return (
            <motion.div
              key={index}
              variants={bigContainer}
              initial="hidden"
              animate="show"
            >
              <div
                style={{
                  backgroundImage: "url('" + item.image + "')",
                }}
                className={`relative bg-no-repeat bg-cover h-[90vh] after:content-[''] after:absolute after:inset-0 after:bg-black/70 after:-z-1`}
              >
                <Container>
                  <div className="grid grid-cols-2 relative z-10 items-center text-center h-[90vh]">
                    <span className="absolute flex items-center justify-center top-10 left-2 w-8 h-8 bg-red-600 text-white">
                      {index + 1}
                    </span>
                    <div className="col-span-2">
                      <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                      >
                        <h2 className="text-6xl font-bold text-white mb-10">
                          {item.title}
                        </h2>
                      </motion.div>
                      <motion.div
                        variants={itemsAni}
                        initial={"hidden"}
                        animate={"show"}
                      >
                        <Button
                          color="primary"
                          className="drop-shadow-lg"
                          style={{ background: "#fff", border: 0 }}
                        >
                          Take A Look
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-2 relative z-10 items-center text-center h-[90vh]">
            <span className="absolute flex items-center justify-center top-10 left-2 w-8 h-8 bg-red-600 text-white">
              1
            </span>
            <div className="col-span-2">
              <h2 className="text-6xl font-bold text-white mb-10">
                Where engineering and technology meet agriculture
              </h2>
              <Button
                color="primary"
                className="drop-shadow-lg"
                style={{ background: "#fff", border: 0 }}
              >
                Take A Look
              </Button>
            </div>
          </div> */}
                </Container>
              </div>
            </motion.div>
          );
      })}
    </section>
  );
};

export default Banner;
