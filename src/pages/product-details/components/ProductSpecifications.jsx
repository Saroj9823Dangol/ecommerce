import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const ProductSpecifications = ({
  specifications,
  materials,
  careInstructions,
}) => {
  const [activeTab, setActiveTab] = useState("specifications");

  const tabs = [
    { id: "specifications", label: "Specifications", icon: "FileText" },
    { id: "materials", label: "Materials", icon: "Layers" },
    { id: "care", label: "Care Instructions", icon: "Heart" },
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-coder font-medium text-sm transition-all duration-200 ${
                activeTab === tab?.id
                  ? "text-primary border-b-2 border-primary bg-secondary/50"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "specifications" && (
          <div className="space-y-4">
            <h3 className="font-monument font-semibold text-lg mb-4">
              Product Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specifications?.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
                >
                  <span className="font-coder font-medium text-sm text-muted-foreground">
                    {spec?.label}
                  </span>
                  <span className="font-coder text-sm text-foreground">
                    {spec?.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "materials" && (
          <div className="space-y-4">
            <h3 className="font-monument font-semibold text-lg mb-4">
              Materials & Construction
            </h3>
            <div className="space-y-4">
              {materials?.map((material, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-coder font-semibold text-sm text-foreground mb-1">
                      {material?.component}
                    </h4>
                    <p className="font-coder text-sm text-muted-foreground">
                      {material?.description}
                    </p>
                    {material?.percentage && (
                      <span className="inline-block mt-1 bg-secondary px-2 py-1 rounded text-xs font-coder">
                        {material?.percentage}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "care" && (
          <div className="space-y-4">
            <h3 className="font-monument font-semibold text-lg mb-4">
              Care Instructions
            </h3>
            <div className="space-y-4">
              {careInstructions?.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Icon
                    name={instruction?.icon}
                    size={20}
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-coder font-semibold text-sm text-foreground mb-1">
                      {instruction?.title}
                    </h4>
                    <p className="font-coder text-sm text-muted-foreground">
                      {instruction?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-md p-4 mt-6">
              <div className="flex items-start space-x-3">
                <Icon
                  name="AlertTriangle"
                  size={20}
                  className="text-warning mt-0.5 flex-shrink-0"
                />
                <div>
                  <h4 className="font-coder font-semibold text-sm text-foreground mb-1">
                    Important Note
                  </h4>
                  <p className="font-coder text-sm text-muted-foreground">
                    Following these care instructions will help maintain the
                    quality and extend the lifespan of your product. Improper
                    care may void the warranty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSpecifications;
