import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Media, Row, Col, Container } from "reactstrap";
import Breadcrumb from "../../views/Containers/Breadcrumb";
import { API } from "../../app/services/api.service"; // Update this import path
import { Category, objCache, StoreBaseDetails } from "@/app/globalProvider";
import { useRouter, useSearchParams } from "next/navigation";

// Define interfaces for type safety
interface BusinessDetails {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  // Add other properties as needed based on your BusinessDetails model
}

const CategoryPage: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [Categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryType = searchParams.get("type") || "all";

  useEffect(() => {
    try {
      setLoading(true);
      if (categoryType === "featured") {
        setCategories(objCache.categories);
        objCache.on("updateCategories", (data: Category[]) => {
          setCategories(data);
        });
      }
      if (categoryType === "all") {
        setCategories(objCache.allCategories);
        objCache.on("updateAllCategories", (data: Category[]) => {
          setCategories(data);
        });
      }
    } catch (err) {
      console.error("Error fetching business details:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-light">
        <Breadcrumb title="Store" parent="home" />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "400px" }}
        >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light">
      <Breadcrumb title="Categories" parent="home" />

      {/* Categories section */}
      <section className="categories-section section-big-py-space">
        <Container>
          <Row>
            {Categories.map(
              (category) =>
                category.category_products.length > 0 && (
                  // Check if the category has products before displaying
                  // Display each category with its image and name
                  <Col sm="6" md="6" lg="3" xl="2" key={category.id}>
                    <div
                      className="category-item mb-4 p-3 border rounded shadow-sm"
                      onClick={() =>
                        router.push(
                          `/collections/no-sidebar?id=${category.id}&type=category`
                        )
                      }
                    >
                      {category.img.length > 0 && (
                        <Media
                          body
                          src={category.img[0] || "/placeholder.jpg"}
                          alt={category.name}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginRight: "10px",
                          }}
                        ></Media>
                      )}
                      <h5>{category.name}</h5>
                    </div>
                  </Col>
                )
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
};
export default CategoryPage;
