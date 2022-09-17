import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [idnum, setID] = useState(0);
  const [name, setName] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [supplier, setSupplier] = useState("");
  const [monthadded, setMonth] = useState("");

  //  const [newQuan,setNewquan] = useState(0)

  // const [input,setInput] = useState({
  //   idnum:"",
  //   names:"",
  //   quan:"",
  //   supplier:"",
  //   monthadded:""
  // })
  // console.log(input)

  // const handleChange = (event) => {
  //   const {name,value} = event.target
  //   setInput(prev=>({...prev,[name]:value}))
  // }

  const [productsList, setList] = useState([]);
  console.log(productsList);

  const getStocks = () => {
    Axios.get("https://crud-backend-deploy.herokuapp.com/stocks").then(
      (response) => {
        const newProductList = response.data.map((product) => {
          return {
            ID: product.ID,
            Name: product.Name,
            newQuan: "",
            Quantity: product.Quantity,
            Supplier: product.Supplier,
            Month: product.Month,
          };
        });
        setList(newProductList);
        // console.log(response)
      }
    );
  };

  const Addproduct = () => {
    Axios.post("https://crud-backend-deploy.herokuapp.com/create", {
      idnum: idnum,
      name: name,
      Quantity: Quantity,
      supplier: supplier,
      monthadded: monthadded,
    }).then(() => {
      setList([
        ...productsList,
        {
          idnum: idnum,
          name: name,
          Quantity: Quantity,
          supplier: supplier,
          monthadded: monthadded,
        },
      ]);
      setID(0);
      setName("");
      setQuantity(0);
      setSupplier("");
      setMonth("");
    });
  };

  //ตัวหลังทำให้
  const updateQuan = (catId, newQuan) => {
    console.log(catId);
    Axios.put("https://crud-backend-deploy.herokuapp.com/update", {
      Quantity: newQuan,
      id: catId,
    }).then((response) => {
      setList(
        productsList.map((product) => {
          return product.ID === catId
            ? {
                ID: product.ID,
                Name: product.Name,
                newQuan: "",
                Quantity: parseInt(newQuan),
                Supplier: product.Supplier,
                Month: product.Month,
              }
            : product;
        })
      );
    });
  };

  const deleteStocks = (id) => {
    Axios.delete(`https://crud-backend-deploy.herokuapp.com/delete/${id}`).then(
      (response) => {
        setList(
          productsList.filter((val) => {
            return val.ID !== id;
          })
        );
      }
    );
  };

  const handleCahangeNewQuan = (event, id) => {
    console.log(id);
    setList(
      productsList.map((product) => {
        return product.ID === id
          ? {
              ID: product.ID,
              Name: product.Name,
              newQuan: event.target.value,
              Quantity: product.Quantity,
              Supplier: product.Supplier,
              Month: product.Month,
            }
          : product;
      })
    );
  };

  return (
    <div className="App container m-3">
      <h1 className="m-3">Stocks info</h1>
      <div className="information">
        <div className="mb-3">
          <label className="form label">ProductsID:</label>
          <input
            type="number"
            className="form-control"
            onChange={(event) => {
              setID(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form label">Productsname:</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form label">Productquantity:</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form label">SupplierName:</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => {
              setSupplier(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form label">Month:</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => {
              setMonth(event.target.value);
            }}
          />
        </div>

        <button className="btn btn-success" onClick={Addproduct}>
          Add products
        </button>
      </div>
      <br></br>
      <div className="Stocks">
        <button className="btn btn-primary" onClick={getStocks}>
          ShowStocks
        </button>

        {productsList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
                <h3 className="card-text h6">ProductsID: {val.ID}</h3>
                <h3 className="card-text h6">Name: {val.Name}</h3>
                <h3 className="card-text h6">Quantity: {val.Quantity}</h3>
                <h3 className="card-text h6">Supplier: {val.Supplier}</h3>
                <h3 className="card-text h6">Month: {val.Month}</h3>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    s
                    value={val.newQuan}
                    style={{ width: "200px", height: "30px" }}
                    placeholder="Quantity Change"
                    className="form-control me-2 form-control-sm"
                    onChange={(event) => {
                      handleCahangeNewQuan(event, val.ID);
                    }}
                  />
                  <button
                    className="btn btn-warning me-1 mt-0"
                    onClick={() => {
                      // console.log(val)
                      updateQuan(val.ID, val.newQuan);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger mt-0"
                    onClick={() => {
                      deleteStocks(val.ID);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
