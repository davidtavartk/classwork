const getTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  };

const getUsers = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        console.log("User deleted with ID:", id); 
        const tbody = document.querySelector('tbody');
        
        // Find the row with the matching data-id and remove it
        const rowToDelete = Array.from(tbody.querySelectorAll('tr')).find(row => row.dataset.id == id);
        
        if (rowToDelete) {
            rowToDelete.remove(); // Remove the row from the table
            console.log("Row successfully deleted."); 
        } else {
            console.error("Row not found for ID:", id); 
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};



const renderTodos = async () => {
    const todos = await getTodos();
    const users = await getUsers();
    const tbody = document.querySelector('tbody');
    let rows = '';

    for (let i = 0; i < 10; i++) {
        const status = todos[i].completed ? 
            `<span class="status active">Active</span>` : 
            `<span class="status non-active">Non-active</span>`;

        rows += `
            <tr data-id="${users[i].id}"> <!-- Make sure this is present -->
                <td class="checkbox">
                    <input type="checkbox" class="custom-checkbox" />
                </td>
                <td class="image">
                    <img src="classwork.png" alt="Thumbnail" width="50" />
                </td>
                <td class="col-432">${todos[i].title}</td>
                <td class="col-236">${users[i].email}</td>
                <td class="col-203">${users[i].address.street} ${users[i].address.suite}</td>
                <td class="col-306">${users[i].address.zipcode}</td>
                <td class="col-235">${status}</td>
                <td class="delete col-115">
                    <img class="delete-icon" src="delete-icon.png" alt="Delete" onclick="deleteUser(${users[i].id})"/>
                </td>
            </tr>
        `;
    }

    tbody.innerHTML = rows;
};


renderTodos();
