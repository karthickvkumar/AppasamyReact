import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Power4 } from "gsap/all";


const Truglow = () => {

  const canvas = useRef();

  const [isDarkTheme, setDarkTheme] = useState(true);
  const [enableFooter, setEnableFooter] = useState(true);

  const darkThemeLogo = require("../images/assests/logo-dark.png");
  const lightThemeLogo = require("../images/assests/logo-light.png");
  
  const toggleTheme = () => {
    setDarkTheme(!isDarkTheme);
  }

  useEffect(() => {
    setTimeout(() => {
      (() => {
        gsap.registerPlugin(ScrollTrigger);
      
        let animateTimeline = gsap.timeline();
        let sequenceTimeline = gsap.timeline({
          scrollTrigger: {
            scrub: 1,
            start: "+=50px",
            end: "+=" + window.innerHeight * 8,
            anticipatePin: true,
          },
        });
      

        const context = canvas.current.getContext('2d');
      
        canvas.current.width = 650;
        canvas.current.height = 650;
      
        const sequenceCreator = (texts, imageFolder, frameStart, frameCount) => {
          const currentFrame = (index) => {
            return require(`../images/truglow/${(index + 1).toString()}.png`);
          };
      
          const images = [];
          const products = {
            frame: 0,
          };
      
          for (let i = frameStart; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
          }
      
          sequenceTimeline.to(products, {
            frame: frameCount - 1,
            snap: "frame",
            onUpdate: render,
          });
      
          images[0].onload = render;
      
          function render() {
            
            if (!images[products.frame]) {
              return;
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
              images[products.frame],
              0,
              0,
              images[products.frame].naturalWidth,
              images[products.frame].naturalHeight,
              0,
              0,
              canvas.width,
              canvas.height
              );
              
            if (products.frame) {
              if (texts) {
                if (products.frame > 1) {
                  sequenceTimeline.to(
                    canvas,
                    { autoAlpha: 1, ease: Power4.easeOut },
                    0
                  );
                }
      
                texts.map((text) => {
                  let textId = document.getElementById(text.id);
                  if (products.frame >= text.start && products.frame <= text.end) {
                    sequenceTimeline.to(
                      textId,
                      {
                        autoAlpha: 1,
                        ease: Power4.easeOut,
                      },
                      0
                    );
                  } else {
                    sequenceTimeline.to(
                      textId,
                      {
                        autoAlpha: 0,
                        ease: Power4.easeOut,
                      },
                      0
                    );
                  }
                });
              }
              console.log((frameCount - frameStart - 1 ), products.frame)

              if(212 == products.frame){
                setEnableFooter(false);
              }
              else{
                setEnableFooter(true);
              }
            }
          }
        };
      
        const scrollImages = (texts, imageFolder, frameStart, frameCount) => {
          ScrollTrigger.matchMedia({
            "(min-width: 800px)": function () {
              canvas.width = 650;
              canvas.height = 650;
              sequenceCreator(texts, imageFolder, frameStart, frameCount);
            },
            "(max-width: 768px)": function () {
              canvas.width = 600;
              canvas.height = 600;
              sequenceCreator(texts, imageFolder, frameStart, frameCount);
            },
            "(max-width: 512px)": function () {
              canvas.width = 350;
              canvas.height = 350;
              sequenceCreator(texts, imageFolder, frameStart, frameCount);
            },
          });
        };
      
        const animateOnLoad = (imageFolder, frameStart, frameCount, duration) => {
          const currentFrame = (index) => {
            return require(`../images/truglow/${(index + 1).toString()}.png`);
          };
      
          const initalImages = [];
          const initialProducts = {
            frame: 0,
          };
      
          for (let i = frameStart; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            initalImages.push(img);
          }
      
          animateTimeline.to(initialProducts, {
            frame: frameCount - 1,
            snap: "frame",
            onUpdate: () => {
              if (initialProducts.frame) {
                context.clearRect(0, 0, canvas.current.width, canvas.current.height);
                context.drawImage(
                  initalImages[initialProducts.frame],
                  0,
                  0,
                  initalImages[initialProducts.frame].naturalWidth,
                  initalImages[initialProducts.frame].naturalHeight,
                  0,
                  0,
                  canvas.current.width,
                  canvas.current.height
                );
      
                let textId = document.getElementById("product-description-1");
                animateTimeline.to(
                  textId,
                  {
                    autoAlpha: 1,
                    ease: Power4.easeOut,
                  },
                  0
                );
              }
            },
          });
      
          animateTimeline.play();
          animateTimeline.duration(duration);
        };
      
        setTimeout(() => {
          animateOnLoad("./images/truglow", 0, 29, 1.5);
      
          scrollImages(
            [
              {
                id: "product-description-1",
                start: 0,
                end: 12,
              },
              {
                id: "product-description-2",
                start: 15,
                end: 37,
              },
              {
                id: "product-description-3",
                start: 38,
                end: 62,
              },
              {
                id: "product-description-4",
                start: 63,
                end: 93,
              },
              {
                id: "product-description-5",
                start: 94,
                end: 111,
              },
              {
                id: "product-description-6",
                start: 112,
                end: 117,
              },
              {
                id: "product-description-7",
                start: 118,
                end: 189,
              },
              {
                id: "product-description-8",
                start: 190,
                end: 198,
              },
              {
                id: "product-description-9",
                start: 199,
                end: 211,
              }
            ],
            "./images/truglow",
            29,
            242
          );
        });
      })();
    })
  }, [])

  return (
    <div className={isDarkTheme ? "darkTheme" : "lightTheme"}>
      <div className={isDarkTheme ? "header darkTheme-header" : "header lightTheme-header"}>
        <img src={isDarkTheme ? darkThemeLogo : lightThemeLogo} />
        <div className="sub-heading">
          <span className="heading">Corporate</span>
          <span className="heading">Product</span>
          <span className="heading">Support</span>
          <img src={require("../images/assests/sun.png")} height="25rem" className="switch-theme" onClick={() => toggleTheme()}/>
        </div>
      </div>
      <div className="main-section">
        <div className="product-content">
          <div className="product-info">
            <div className="product-description" id="product-description-1">
            <div className="skrollable skrollable-between">
              <div id="truglowline" className="truglowbanner1" style={ isDarkTheme ? { borderRight: "7px solid #fff"} : {borderRight : "7px solid black"}}> &nbsp;</div>
              <div id="002" className="truglowbanner2">legend</div>
              <div id="003" className="truglowbanner3">truglow</div>
              <div id="004" className="truglowbanner4">fs - 1 </div>
            </div>
            </div>
            <div className="product-description" id="product-description-2">
              <h1>Precise Optics</h1>
              <h2>
              The AAMO Legend Truglow FS-1 has a converging binocular optical head with precise optics. The major advantage of this microscope is that it allows deep light penetration, provides greater visibility and better diagnostic perception. Its optics offers a higher quality view with improved efficiency to doctor's working conditions.
              </h2>
            </div>
            <div className="product-description" id="product-description-3">
              <h1>Ideal Light Source</h1>
              <h2>
              The integrated led illumination emits a light beam that penetrates even in the most unapproachable areas during the surgical procedures, thus illuminating your field of view with uniformity.
              </h2>
            </div>
            <div className="product-description" id="product-description-4">
              <h1>Tiltable Eye Piece</h1>
              <h2>
              When work surfaces are set at elbow height to facilitate hand operations, the tiltable eyepiece allows the doctor to set the microscope's eyepiece height to achieve a good ergonomic neutral posture. Adjustability eliminates raised shoulders and bent necks, which can cause discomfort.
              </h2>
            </div>
            <div className="product-description" id="product-description-5">
              <h1>C-Mount With Hd Camera</h1>
              <h2>
              It has an uhd digital camera integrated with seamless designed microscope capable of streaming high resolution video.
              </h2>
            </div>
            <div className="product-description" id="product-description-6">
              <h1>Enhanced Magnification</h1>
              <h2>
              The aamo legend truglow fs-1 provides continuous zoom magnification varying from 0.4x to 2.4x. To improve surgeon convenience the control knobs are located on the sides of the microscope head for selecting the desired magnification. Sterilizable protectors are attached on the magnification changer knobs and the microscope positioning handle.</h2>
            </div>
            <div className="product-description" id="product-description-7">
              <h1>X-Y Coupling Unit</h1>
              <h2>
              The ±60mm stroke both in x and y directions allow the surgeon to cover an extensive area during the cataract surgery. With the introduction of an upgraded x-y coupling, reliability in positioning has been improved.
              </h2>
            </div>
            <div className="product-description" id="product-description-8">
              <h1>Robust Base Assembly</h1>
              <h2>
              The aamo legend truglow fs-1 has a solid state mobile floor stand with castor locks that arrest the axial and rotary movement. It also has a stand with counter balanced weight that can withstand the weight of suspension arms.
              </h2>
            </div>
            <div className="product-description" id="product-description-9">
              <h1>Foot Switch</h1>
              <h2>
              Foot controller is the default selection where the zoom function of the microscope and the x-y coupling are selected. The foot controller allows 8-way operations: main lamp on, main lamp off, x direction movement, y direction movement, focusing up, focusing down, zoom up and zoom down.
              </h2>
            </div>
          </div>
        </div>
        <div className="canvas-content">
          <div className="product-text">
            <div className="product-highlight" id="product-highlight-1">
              <h2>CO - AXIAL</h2>
            </div>
            <div className="product-highlight" id="product-highlight-2">
              <h2>OBLIQUE</h2>
            </div>
          </div>
          <canvas id="sequence-loader" ref={canvas} ></canvas>
        </div>
        <div className="overlay"></div>
      </div>

      <div className="footer" style={enableFooter ?  {visibility: 'hidden'} : {visibility: 'visible'}}>
        <h1 className="heading">Product Enquiry</h1>
        <h1 className="heading">Product Demo Request</h1>
        <div className="footer-section">
          <h1 className="heading underline">Videos</h1>
          <h1 className="heading underline">Brochure</h1>
          <h1 className="heading underline">Gallary</h1>
        </div>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/2DAFV2DI1PU" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <h3>© 2022 Appasamy Associates Private Limited</h3>
      </div>
    </div>
  );
};

export default Truglow;
