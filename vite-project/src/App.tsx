import { useState } from "react";
import ProductCard from "./component/ProductCard";
import { productList } from "./component/data";
import MyModal from "./component/ui/Modal";
import Button from "./component/ui/Button";
import { formInputsList } from "./component/data";
import Input from "./component/ui/input";
import { IProduct } from "./component/interfaces/IProduct";
import { errorValidation } from "./validation";
import ErrorMessage from "./component/errorMessage";
import { colors } from "./component/data";

import ColorCircle from "./component/colorCircle";


function App() {
  const defaultProductObj = {
    title: "",
    price: "",
    description: "",
    imageURL: "",
    colors: [],
    category: {
      name: "",
      imageURL: "    ",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const[tempColor, setTempColor] = useState<string[]>([]);
  console.log(tempColor)
  const [error2, setError] = useState({
    title: "",
    price: "",
    description: "",
    imageURL: "",
  });
  const [Product, setProduct] = useState<IProduct>(defaultProductObj);
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProduct({
      ...Product,
      [name]: value,
    });
    setError({
      ...error2,
      [name]: "",
    });
  };
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputs = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col space-y-1">
      <label htmlFor={input.id}>{input.label}</label>
      <Input
        className="p-2 border-2 border-gray-200 h-10 my-2 "
        type={input.type}
        name={input.name}
        id={input.id}
        placeholder={input.label}
        value={Product[input.name]}
        onChange={handleChange}
      />
      <ErrorMessage message={error2[input.name]} />
    </div>
  ));
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, price, description, imageURL } = Product;
    const error = errorValidation({
      title,
      price,
      description,
      imageURL,
    });
    const hasErrorMessage =
      Object.values(error).some((err) => err == "") &&
      Object.values(error).every((err) => err == "");
    if (!hasErrorMessage) {
      setError(error);
      return;
    }

    close();
  };
  const cancelHandler = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setProduct(defaultProductObj);
    close();
  };
  const renderColors = colors.map((color) => (
    <ColorCircle key={color} color={color} 
      onClick={() => {
        if(tempColor.includes(color)){
          setTempColor((prev) => prev.filter((item) => item !== color));
        return;
        };
       setTempColor(prev=>[...prev, color]);
      }
      }
     />
  ));

  return (
    <main className="container mx-auto">
      <Button
        className="bg-blue-800 hover:bg-amber-50  w-50 "
        onClick={() => open()}>
        add product
      </Button>

      <div className="border-2 border-gray-200 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-5">
        {renderProductList}
        <MyModal isOpenn={isOpen} close={close} title="Add New Product">
          <form className="flex flex-col space-x-3" onSubmit={submitHandler}>
            {renderFormInputs}
            <div className=" flex items-center flex-wrap space-x-1">
              {renderColors}
            </div>
            <div className=" flex items-center flex-wrap space-x-1">
             {tempColor.map((color) => (
              <span key={color} className="block " style={{ backgroundColor: color }}> 
                 {color}
              </span>
              ))}
            </div>

            <div className="flex items-center justify-between space-x-1.5 my-1.5">
              <Button className="bg-indigo-500 hover:bg-indigo-300 w-full h-10 rounded-md text-white">
                submit
              </Button>
              <Button
                className="bg-gray-700  hover:bg-gray-500 w-full h-10  rounded-md text-white"
                onClick={cancelHandler}>
                cancel
              </Button>
            </div>
          </form>
        </MyModal>
      </div>
    </main>
  );
}
export default App;
