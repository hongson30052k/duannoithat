export const formatCurrency = (value: string) => {
    // Loại bỏ tất cả ký tự không phải là số
    let formattedValue = value.replace(/[^\d]/g, '');
    
    // Định dạng giá trị với dấu '.' ở hàng nghìn
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return formattedValue;
  };