const portalService = {
  createPortal,
  updatePortal,
};

export function createPortal(reqBody) {
  return fetch("http://localhost:5000/create-portal", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    return response.text;
  });
}

export function updatePortal(reqBody, id) {
  return fetch(`http://localhost:5000/update-portal/${id}`, {
    method: "PATCH",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    return response.text;
  });
}

export function deletePortal(id) {
  return fetch(`http://localhost:5000/delete-portal/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    return response.text;
  });
}

export const getPortals = async () => {
  try {
    const response = await fetch("http://localhost:5000/get-portals");
    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default portalService;
