// Marketplace functionality for FarmConnect

document.addEventListener('DOMContentLoaded', function() {
    // Initialize marketplace features
    initProductFiltering();
    initProductLoading();
    initSearchFunctionality();
});

// Sample product data
const sampleProducts = [
    {
        id: 1,
        name: "Organic Tomatoes",
        price: 3.50,
        unit: "lb",
        quantity: 150,
        category: "vegetables",
        location: "california",
        farmer: "Maria Rodriguez",
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
        description: "Fresh, vine-ripened organic tomatoes grown without pesticides"
    },
    {
        id: 2,
        name: "Free-Range Eggs",
        price: 6.00,
        unit: "dozen",
        quantity: 80,
        category: "dairy",
        location: "iowa",
        farmer: "James Thompson",
        image: "https://images.unsplash.com/photo-1559054663-e431ec5e6e13?w=400",
        description: "Farm fresh eggs from free-range chickens"
    },
    {
        id: 3,
        name: "Sweet Corn",
        price: 4.00,
        unit: "dozen",
        quantity: 200,
        category: "vegetables",
        location: "texas",
        farmer: "Grace Okafor",
        image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400",
        description: "Sweet, juicy corn harvested at peak ripeness"
    },
    {
        id: 4,
        name: "Fresh Milk",
        price: 5.50,
        unit: "gallon",
        quantity: 60,
        category: "dairy",
        location: "florida",
        farmer: "Robert Chen",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
        description: "Fresh whole milk from grass-fed cows"
    },
    {
        id: 5,
        name: "Organic Strawberries",
        price: 7.00,
        unit: "lb",
        quantity: 45,
        category: "fruits",
        location: "california",
        farmer: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400",
        description: "Sweet, juicy organic strawberries picked fresh daily"
    },
    {
        id: 6,
        name: "Winter Wheat",
        price: 12.00,
        unit: "bushel",
        quantity: 300,
        category: "grains",
        location: "iowa",
        farmer: "Michael Davis",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
        description: "High-quality winter wheat perfect for baking"
    },
    {
        id: 7,
        name: "Grass-Fed Beef",
        price: 8.50,
        unit: "lb",
        quantity: 120,
        category: "livestock",
        location: "texas",
        farmer: "David Wilson",
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400",
        description: "Premium grass-fed beef raised on open pastures"
    },
    {
        id: 8,
        name: "Organic Apples",
        price: 4.50,
        unit: "lb",
        quantity: 90,
        category: "fruits",
        location: "florida",
        farmer: "Lisa Anderson",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
        description: "Crisp, organic apples grown in ideal conditions"
    },
    {
        id: 9,
        name: "Fresh Lettuce",
        price: 2.50,
        unit: "head",
        quantity: 180,
        category: "vegetables",
        location: "california",
        farmer: "Carlos Martinez",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400",
        description: "Crisp, fresh lettuce grown hydroponically"
    },
    {
        id: 10,
        name: "Organic Honey",
        price: 9.00,
        unit: "jar",
        quantity: 75,
        category: "dairy",
        location: "illinois",
        farmer: "Jennifer Brown",
        image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=400",
        description: "Pure, raw honey from local beehives"
    },
    {
        id: 11,
        name: "Sweet Potatoes",
        price: 3.00,
        unit: "lb",
        quantity: 140,
        category: "vegetables",
        location: "texas",
        farmer: "Thomas Lee",
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
        description: "Nutritious sweet potatoes perfect for any meal"
    },
    {
        id: 12,
        name: "Fresh Herbs",
        price: 5.00,
        unit: "bunch",
        quantity: 100,
        category: "vegetables",
        location: "florida",
        farmer: "Anna White",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
        description: "Aromatic fresh herbs including basil, rosemary, and thyme"
    }
];

// Product filtering functionality
function initProductFiltering() {
    const categoryFilter = document.getElementById('categoryFilter');
    const locationFilter = document.getElementById('locationFilter');

    if (categoryFilter && locationFilter) {
        categoryFilter.addEventListener('change', filterProducts);
        locationFilter.addEventListener('change', filterProducts);
    }
}

// Search functionality
function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterProducts();
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', filterProducts);
    }
}

// Load and display products
function initProductLoading() {
    loadProducts(sampleProducts);
}

// Filter products based on search and filters
function filterProducts() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const locationFilter = document.getElementById('locationFilter')?.value || '';

    const filteredProducts = sampleProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                             product.description.toLowerCase().includes(searchTerm) ||
                             product.farmer.toLowerCase().includes(searchTerm);

        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        const matchesLocation = !locationFilter || product.location === locationFilter;

        return matchesSearch && matchesCategory && matchesLocation;
    });

    loadProducts(filteredProducts);
    updateProductCount(filteredProducts.length);
}

// Load products into the grid
function loadProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    const productTemplate = document.getElementById('productTemplate');

    if (!productsGrid || !productTemplate) return;

    // Clear existing products
    productsGrid.innerHTML = '';

    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your search criteria or filters</p>
            </div>
        `;
        return;
    }

    products.forEach(product => {
        const productElement = createProductElement(product, productTemplate);
        productsGrid.appendChild(productElement);
    });
}

// Create product element from template
function createProductElement(product, template) {
    const productElement = template.cloneNode(true);
    productElement.style.display = 'block';
    productElement.id = `product-${product.id}`;

    // Set product data attributes
    productElement.setAttribute('data-category', product.category);
    productElement.setAttribute('data-location', product.location);

    // Update product information
    const productImage = productElement.querySelector('.product-img');
    const productTitle = productElement.querySelector('.product-title');
    const productPrice = productElement.querySelector('.product-price');
    const productLocation = productElement.querySelector('.product-location');
    const productQuantity = productElement.querySelector('.product-quantity');
    const productFarmer = productElement.querySelector('.product-farmer');
    const productBtn = productElement.querySelector('.product-btn');

    if (productImage) productImage.src = product.image;
    if (productImage) productImage.alt = product.name;
    if (productTitle) productTitle.textContent = product.name;
    if (productPrice) productPrice.textContent = `$${product.price.toFixed(2)} / ${product.unit}`;
    if (productLocation) productLocation.textContent = `📍 ${product.location.charAt(0).toUpperCase() + product.location.slice(1)}`;
    if (productQuantity) productQuantity.textContent = `Available: ${product.quantity} ${product.unit}s`;
    if (productFarmer) productFarmer.textContent = `by ${product.farmer}`;

    // Add click event for contact button
    if (productBtn) {
        productBtn.addEventListener('click', function() {
            showContactModal(product);
        });
    }

    return productElement;
}

// Update product count display
function updateProductCount(count) {
    const productsCount = document.getElementById('productsCount');
    if (productsCount) {
        productsCount.textContent = `${count} product${count !== 1 ? 's' : ''} found`;
    }
}

// Show contact modal for product
function showContactModal(product) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('contactModal');
    if (!modal) {
        modal = createContactModal();
    }

    // Update modal content with product info
    const modalTitle = modal.querySelector('.modal-title');
    const modalProduct = modal.querySelector('.modal-product');
    const farmerName = modal.querySelector('.farmer-name');

    if (modalTitle) modalTitle.textContent = 'Contact Farmer';
    if (modalProduct) modalProduct.textContent = product.name;
    if (farmerName) farmerName.textContent = product.farmer;

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Create contact modal
function createContactModal() {
    const modal = document.createElement('div');
    modal.id = 'contactModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Contact Farmer</h2>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <p class="modal-product">Product Name</p>
                <p class="farmer-info">Interested in <strong class="farmer-name">Farmer Name</strong>'s products?</p>
                <p class="modal-message">Send them a message to inquire about pricing, availability, and delivery options.</p>
                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="closeContactModal()">Cancel</button>
                    <button class="btn btn-primary" onclick="openEmailClient()">Send Email</button>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = `
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 30px 20px;
            border-bottom: 1px solid #eee;
        }

        .modal-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2d5016;
            margin: 0;
        }

        .modal-close {
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            line-height: 1;
        }

        .modal-close:hover {
            color: #333;
        }

        .modal-body {
            padding: 30px;
        }

        .modal-product {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2d5016;
            margin-bottom: 15px;
        }

        .farmer-info {
            margin-bottom: 15px;
            color: #555;
        }

        .farmer-name {
            color: #2d5016;
        }

        .modal-message {
            margin-bottom: 25px;
            color: #666;
            line-height: 1.6;
        }

        .modal-actions {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
        }

        @media (max-width: 768px) {
            .modal-actions {
                flex-direction: column;
            }

            .modal-header,
            .modal-body {
                padding: 20px;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);

    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', closeContactModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeContactModal();
        }
    });

    document.body.appendChild(modal);
    return modal;
}

// Close contact modal
function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Open email client
function openEmailClient() {
    const farmerName = document.querySelector('.farmer-name')?.textContent || 'Farmer';
    const productName = document.querySelector('.modal-product')?.textContent || 'Product';
    const subject = encodeURIComponent(`Inquiry about ${productName}`);
    const body = encodeURIComponent(`Hi ${farmerName},

I'm interested in your ${productName} listing on FarmConnect. Could you please provide more information about:

- Current availability
- Pricing details
- Delivery options
- Minimum order quantities

Thank you!`);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

// Make functions globally available
window.closeContactModal = closeContactModal;
window.openEmailClient = openEmailClient;

// Add CSS for no products state
const additionalStyles = `
    .no-products {
        text-align: center;
        padding: 60px 20px;
        grid-column: 1 / -1;
    }

    .no-products h3 {
        font-size: 1.5rem;
        color: #2d5016;
        margin-bottom: 10px;
    }

    .no-products p {
        color: #666;
        font-size: 1.1rem;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
