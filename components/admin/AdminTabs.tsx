import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllProducts from "./AllProducts";
import AllCollections from "./AllCollections";
import AllOrders from "./AllOrders";
import Content from "./Content";

function AdminTabs() {
  return (
    <div>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Products</TabsTrigger>
          <TabsTrigger value="password">Collections</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AllProducts />
        </TabsContent>
        <TabsContent value="password">
          <AllCollections />
        </TabsContent>
        <TabsContent value="orders">
          <AllOrders />
        </TabsContent>
        <TabsContent value="content">
          <Content />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminTabs;
